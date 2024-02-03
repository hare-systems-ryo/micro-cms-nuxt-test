
@echo off
cd ..
@REM call npx supabase stop
docker compose down
docker compose up --detach --build
@REM detach > デタッチモード（コンテナをバックグラウンドで起動）
docker compose -f docker-compose.yml up --detach --build
@REM call npx supabase start 
docker compose logs -f
cmd /k

