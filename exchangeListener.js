#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:qwer$asdf!1@192.168.56.1', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'count';

    ch.assertExchange("count", "fanout", { durable: true })
    
    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, function(msg) {
        console.log(" [x] %s", msg.content.toString());
      }, {noAck: true});

    });

  });
});