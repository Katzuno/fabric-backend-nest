## Requirments:

- docker-compose

Laravel service should be up (or at least rabbitmq).

## How it works

When the nest service is opened it automatically consumes messages from the ``records_to_analyze`` queue (behavior defined in app controller).

Those messages are consumed by interogating omdb api service on both scenario (if we have imdb_id or if we don't have on the payload).

If it got data from the omdb api it publishes the message through rabbit-mq publisher to the ``records_analyzed`` queue.

## Run the app

To run the app you have to run ``make up`` or the associated command from the makefile.

To run the tests: ``npm run test`` with node and npm installed on the machine.
The alternative it to open a shell in docker and run them from there.

## What can be better

- Code organization
- E2E test
- Testing environments for e2e tests
- Think about security, type of queues, requeue, ack, nack, etc.
