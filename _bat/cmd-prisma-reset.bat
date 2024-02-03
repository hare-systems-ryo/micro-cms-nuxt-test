
@echo off
cd ..
call npx sequelize db:migrate:undo:all 
call npx sequelize db:migrate
call npm run prisma-pull
call npm run prisma-format
call npm i 
call npm run prisma-generate
cmd /k
