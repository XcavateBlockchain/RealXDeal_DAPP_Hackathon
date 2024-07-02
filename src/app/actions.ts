'use server';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  GetCommandOutput
} from '@aws-sdk/lib-dynamodb';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { createCanvas } from 'canvas';
import { getApi } from '@/lib/polkadot';
import Keyring from '@polkadot/keyring';
import { GameResultType } from '@/lib/extrinsic';

const client = new DynamoDBClient({
  region: 'eu-west-2', // specify your region
  credentials: {
    accessKeyId: process.env.DYNAMO_ACCESS_KEY!,
    secretAccessKey: process.env.DYNAMO_SECRET_KEY!
  }
});

const docClient = DynamoDBDocumentClient.from(client);

const checkerboardSize = 2.5;

async function fetchImage(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  return response.arrayBuffer();
}

async function applyCheckerboardOverlay(imageBuffer: ArrayBuffer) {
  const originalImage = sharp(imageBuffer);
  const { width, height } = await originalImage.metadata();

  const canvas = createCanvas(width!, height!);
  const ctx = canvas.getContext('2d');

  for (let y = 0; y < height!; y += checkerboardSize) {
    for (let x = 0; x < width!; x += checkerboardSize) {
      if ((x / checkerboardSize + y / checkerboardSize) % 2 === 0) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x, y, checkerboardSize, checkerboardSize);
      }
    }
  }

  const checkerboardBuffer = canvas.toBuffer();

  const processedImage = await originalImage
    .composite([{ input: checkerboardBuffer, blend: 'over' }])
    .flop()
    .greyscale()
    .jpeg()
    .toBuffer();

  return processedImage.toString('base64');
}

export async function checkResult(
  data: GameResultType,
  secret: { scheme: string; key: string; iv: string }
) {
  const api = await getApi();
  const keyring = new Keyring({ type: 'sr25519' });
  const account = keyring.createFromJson({
    encoded: process.env.ENCODED_SEED!,
    encoding: {
      content: ['pkcs8', 'sr25519'],
      type: ['scrypt', 'xsalsa20-poly1305'],
      version: '3'
    },
    address: process.env.SUDO_ADDRESS!,
    meta: {
      genesisHash: '0x',
      name: 'XCAV-SUDO',
      whenCreated: 1702476542911
    }
  });

  account.unlock(process.env.PASSPHRASE!);

  const extrinsic = api.tx.gameModule.checkResult(
    data.guess,
    data.gameId,
    data.price,
    JSON.stringify(secret)
  );

  // Sign and send the transaction
  const unsub = await extrinsic.signAndSend(account, ({ status, events = [] }) => {
    if (status.isInBlock) {
      console.log('Transaction included at blockHash', status.asInBlock.toHex());
    } else if (status.isFinalized) {
      console.log('Transaction finalized at blockHash', status.asFinalized.toHex());
      unsub();
    }
  });
}

export async function fetchPropertyData(id: number) {
  try {
    const res = await docClient.send(
      new GetCommand({
        TableName: 'realXDeal',
        Key: {
          id
        }
      })
    );
    return res.Item;
  } catch (error) {
    console.log('Error fetching property:', error);
  }
}

export async function fetchPropertyForDisplay(id: number) {
  console.log('Logging on the server');

  const data = await fetchPropertyData(id);
  if (data) {
    const displayData = await processPropertyData(data);
    return displayData;
  } else {
    return undefined;
  }
}

async function processPropertyData(propertyData: Record<string, any>) {
  const {
    mainImageSrc,
    images,
    summary,
    location,
    bedrooms,
    bathrooms,
    displaySize,
    propertySubType
  } = propertyData;

  try {
    const processedMainImage = await processImage(mainImageSrc);
    const processedImages = await Promise.all(
      images.map((img: any) => {
        return processImage(img.srcUrl);
      })
    );

    return {
      cover_image: processedMainImage,
      type: propertySubType,
      location,
      summary,
      bedrooms,
      bathrooms,
      size: displaySize,
      images: processedImages
    };
  } catch (error) {
    console.log('Error: ', error);
  }
}

export async function processImage(imageUrl: string) {
  const imageBuffer = await fetchImage(imageUrl);
  const imageString = await applyCheckerboardOverlay(imageBuffer);
  return `data:image/jpeg;base64,${imageString}`;
}
