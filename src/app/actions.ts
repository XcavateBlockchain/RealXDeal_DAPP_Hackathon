'use server';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { createCanvas } from 'canvas';

const imageUrls = [
  'https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/32k/31572/148508522/31572_PAR130157_IMG_00_0000_max_476x317.jpeg',
  'https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/257k/256565/146381138/256565_BCL15_IMG_01_0000_max_476x317.jpeg',
  'https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/111k/110768/144527498/110768_101184001677_IMG_00_0000_max_476x317.jpeg',
  'https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/63k/62293/147208034/62293_32892189_IMG_00_0000_max_476x317.jpeg'
];

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

export async function processImages() {
  const processedImagesPromises = imageUrls.map(async url => {
    const imageBuffer = await fetchImage(url);
    return applyCheckerboardOverlay(imageBuffer);
  });

  const processedImages = await Promise.all(processedImagesPromises);
  return processedImages.map(img => `data:image/jpeg;base64,${img}`);
}
