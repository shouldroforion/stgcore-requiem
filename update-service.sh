#!/bin/bash

export AWS_DEFAULT_REGION="us-west-2"
export AWS_PROFILE="stoic"

account="XXXXXXXXXXX"
region="us-west-2"

# Build and tag image for ECR repository.
docker image build --shm-size=2g -t shouldroforion/stgcore-requiem:prod-latest -f ./prod.dockerfile .
docker tag shouldroforion/stgcore-requiem:prod-latest \
    $account.dkr.ecr.$region.amazonaws.com/shouldroforion/stgcore-requiem:prod-latest

# Login to ECR and push image to repository.
aws ecr get-login-password | docker login --username AWS \
    --password-stdin $account.dkr.ecr.$region.amazonaws.com
docker image push $account.dkr.ecr.$region.amazonaws.com/shouldroforion/stgcore-requiem:prod-latest

# Update ECS service.
cluster="CBGPillarOfAutumn-ECSCluster"
service="CBGRequiem-LandingUIECSService"
aws ecs update-service --cluster $cluster \
    --service $service \
    --force-new-deployment \
    | jq -r ".service.serviceArn, .service.serviceName"
