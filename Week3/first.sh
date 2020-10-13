#!/bin/bash

# store the number of process
# into variable cnt
cnt=`ps -ef | wc -l`

#
# bash integer equality operator
#
if [ "$cnt" -gt "$1" ];

then
  echo "number of processes exceeded"
fi
