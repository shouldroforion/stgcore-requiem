# CBG Requiem introduction

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

## Before getting started

Before running or building the solution, there are 2 things that you’ll have to fix: Angular2 routing + NGINX setup for location & root directives.

For routing, the solution is to build the app using `base-href` option. In the case of this project, make sure the `prod.dockerfile` is updated with a command that looks similar to this. Make sure the `requiem` part is updated to be the subfolder/pattern you want the app served from. This comes in handy for path-based routing in AWS load balancers.

```zsh
ng build --base-href=/requiem/ --output-path=dist
```

This build option will lead to the situation where the `index.html` of our app will have a BASE href defined accordingly to the path defined in the command.

```zsh
<base href=”/requiem/” />
```

For the NGINX setup, you’ll have to override the default NGINX settings by using the following configuration. Do that overriding in the `default.conf` file used by Docker to customize the NGINX config when we build and run the image/container.

```zsh
location /requiem/ {
    alias /var/www/html/requiem/;
    try_files $uri$args $uri$args/ /requiem/index.html;
}
```

Make sure the `requiem` part is updated to be the subfolder/pattern you want the app served from. This comes in handy for path-based routing in AWS load balancers.

This combination of `ng build` command and NGINX setup has the following advantages:
- Viewers can access our apps through the configured subfolder/pattern URLs
- If you get on an Angular route, you can refresh pages without getting a 404

To stay consistent with the use of `requiem` across NGINX and Angular, do a search and replace to find all usages of `requiem` and update with the desired subfolder/pattern.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng test --watch=false` to run Karma unit tests.

Run `ng e2e --port 4202` to run Protractor end-to-end tests.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Working with Docker

If all that checks out, move on to Docker and building for CI/CD and production.

Build and tag the Docker image.

```zsh
docker image build -t shouldroforion/stgcore-requiem:latest -f ./app.dockerfile .
```

Then, spin up the container once the build is done.

```zsh
docker container run -d -v ${PWD}:/app -v /app/node_modules -p 4201:4200 \
    --name stgcore-requiem \
    --rm shouldroforion/stgcore-requiem:latest
```

Run the unit and e2e tests.

```zsh
docker exec -it stgcore-requiem ng test --watch=false
docker exec -it stgcore-requiem ng e2e --port 4202
```

Stop the container once done.

```zsh
docker container stop stgcore-requiem
```

Using the production Dockerfile, build and tag the Docker image.

```zsh
docker image build --no-cache -t shouldroforion/stgcore-requiem:prod-latest -f ./prod.dockerfile .
docker tag shouldroforion/stgcore-requiem:prod-latest \
    750444023825.dkr.ecr.us-west-2.amazonaws.com/shouldroforion/stgcore-requiem:prod-latest
```

Get login command for Docker login.

```zsh
profile="stoic"
region="us-west-2"

aws ecr get-login --profile $profile \
    --region $region \
    --no-include-email
```

Push this image to the AWS ECR repository.

```zsh
docker image push 750444023825.dkr.ecr.us-west-2.amazonaws.com/shouldroforion/stgcore-requiem:prod-latest
```

Spin up the PROD container using local image.

```zsh
docker container run -p 4201:80 \
    --name stgcore-requiem-PROD \
    --rm shouldroforion/stgcore-requiem:prod-latest
```

## Forcing the ECS service update in AWS

To force the service to update with newest image in repository. Note this assumes the `PillarOfAutumn` stack has been created in account, along with ECS service for `Requiem`.

```zsh
profile="stoic"
region="us-west-2"
cluster="CBGPillarOfAutumn-ECSCluster"
service="CBGRequiem-LandingUIECSService"

aws ecs update-service --profile $profile \
    --region $region \
    --cluster $cluster \
    --service $service \
    --force-new-deployment
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
