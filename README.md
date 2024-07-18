## bookstore-api-cicd-docker


This repository is a continuation of the https://github.com/lisenpasha/nodejs-bookstore-api project. 

It includes enhancements such as a *CI/CD pipeline* using *GitHub Actions* and *Docker integration*.

The CI/CD pipeline automates the build, test, and image push processes.


## CI/CD Pipeline

#### GitHub Actions Workflow
The CI/CD pipeline is defined in the ci.yml file. It performs the following steps when there is a push to the main branch:

##### 1. Checks out the repository.
##### 2. Sets up Node.js.
##### 3. Makes the setup.sh script executable.
##### 4. Runs the setup.sh script to install dependencies, run tests, and start the services.
##### 5. Verifies that both services are running.
##### 6. Stops the services.
##### 7. Builds and pushes a Docker image to Docker Hub.
