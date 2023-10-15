import { writeFile } from 'node:fs/promises';
export async function POST(event) {
  const formData = await event.request.formData();
  await writeFile(
    `./static/${formData.getAll('file')[1].name}`,
    await formData.getAll('file')[1].stream()
  );
  return new Response(JSON.stringify({ success: true }));
}
