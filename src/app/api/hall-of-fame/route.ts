import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const hallOfFamePath = path.join(process.cwd(), 'public', 'hall-of-fame.json');

interface HallOfFameEntry {
  playerName: string;
  score: number;
}

async function getHallOfFame(): Promise<HallOfFameEntry[]> {
  try {
    const data = await fs.readFile(hallOfFamePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function saveHallOfFame(data: HallOfFameEntry[]) {
  await fs.writeFile(hallOfFamePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const hallOfFame = await getHallOfFame();
  return NextResponse.json(hallOfFame);
}

export async function POST(request: Request) {
  const { playerName, score } = await request.json();
  const hallOfFame = await getHallOfFame();

  hallOfFame.push({ playerName, score });
  hallOfFame.sort((a, b) => b.score - a.score);
  const topScores = hallOfFame.slice(0, 10);

  await saveHallOfFame(topScores);

  return NextResponse.json({ success: true });
}
