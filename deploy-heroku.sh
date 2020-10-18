#!/bin/bash

if [ -z "$1" ]
  then
    echo "Please enter commit message"
  else
    git add .
    git commit -am "$1"
    git push heroku master
fi