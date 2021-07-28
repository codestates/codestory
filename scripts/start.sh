#!/bin/bash
cd /home/ubuntu/codestory/server
export DATABASE_USERNAME=$(aws ssm get-parameters --region us-east-1 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region us-east-1 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_URL=$(aws ssm get-parameters --region us-east-1 --names DATABASE_URL --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region us-east-1 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export AW_ACCESSKEY=$(aws ssm get-parameters --region us-east-1 --names AW_ACCESSKEY --query Parameters[0].Value | sed 's/"//g')
export AW_SECRETKEY=$(aws ssm get-parameters --region us-east-1 --names AW_SECRETKEY --query Parameters[0].Value | sed 's/"//g')
authbind --deep pm2 start index.js