import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');
  const actions = [
    { name: '创建', value: 'create' },
    { name: '读取', value: 'read' },
    { name: '更新', value: 'update' },
    { name: '删除', value: 'delete' },
  ];
  // 获取 src 目录下的所有文件
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const path = require('path');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require('fs');
  const srcDir = path.join(__dirname, '../src');
  const filesName = fs.readdirSync(srcDir).filter((name: string) => {
    return !['app.module.ts', 'common', 'iam', 'main.ts'].includes(name);
  });
  filesName.forEach((name: string) => {
    // 获取第二层的文件夹名称
    const dirPath = path.join(srcDir, name);
    const dirsName = fs.readdirSync(dirPath).filter((name: string) => {
      return !name.endsWith('.ts');
    });
    dirsName.forEach((dirName: string) => {
      actions.forEach(async (action) => {
        const value = `${name}:${dirName}:${action.value}`;
        const existingAction = await prisma.permission.findUnique({
          where: { value },
        });
        if (!existingAction) {
          await prisma.permission.create({
            data: { name: action.name, value },
          });
        }
      });
    });
  });

  console.log('注入数据成功');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
