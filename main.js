#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:qwer$asdf!1@192.168.56.1', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'count';

    ch.assertExchange("count", "fanout")
    
    //ch.assertQueue(q, {durable: false});
    
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});

  });
});