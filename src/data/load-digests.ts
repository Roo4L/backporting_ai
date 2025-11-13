import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';

export interface DigestEntry {
  title: string;
  url: string;
  summary: string;
  tags: string[];
}

export interface Digest {
  id: string;
  slug: string;
  number: number;
  title: string;
  date: string;
  author: string;
  authorUrl?: string;
  summary: string;
  content: string;
  entries: DigestEntry[];
}

export async function loadDigests(): Promise<Digest[]> {
  const digestsDir = join(process.cwd(), 'src/content/digests');
  const files = await readdir(digestsDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  const digests: Digest[] = [];

  for (const file of mdFiles) {
    const filePath = join(digestsDir, file);
    const fileContent = await readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    digests.push({
      id: data.id,
      slug: data.slug,
      number: data.number,
      title: data.title,
      date: data.date,
      author: data.author || 'Anonymous',
      authorUrl: data.authorUrl,
      summary: data.summary,
      content: content.trim(),
      entries: data.entries || [],
    });
  }

  return digests;
}

