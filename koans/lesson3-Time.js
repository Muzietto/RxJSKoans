module('Lesson 3 - Time');

/*
 * Step 1: find the 1st method that fails
 * Step 2: Fill in the blank ____ to make it pass
 * Step 3: run it again
 * Note: Do not change anything other than the blank
 */
asyncTest('LaunchingAnActionInTheFuture', function() {
    var received1 = '';
    var delay1 = 1; // WTF?
    // var delay1 = 1000; // WTF? same result as delay = 1 
    Rx
        .Scheduler
        .immediate
        .schedule(function() { received1 = 'Finished'; }, delay1);

    setTimeout(function() { equals(received1, 'Finished'); start(); }, 500);
});

asyncTest('LaunchingAnEventInTheFuture', function() {
    var received2 = '',
        time = 400; // OK
        // time = 600; // OK - this one fails
        
    Rx
        .Observable
        .returnValue('Godot', Rx.Scheduler.Immediate)
        .delay(time)
        .subscribe(function(x) { received2 = x; });
    
    setTimeout(function() { equals(received2, 'Godot'); start(); }, 500);
});
asyncTest('AWatchedPot', function() {
    var received = 'Cold',
        delay = 600,
        timeout = 500,
        timeoutEvent =
            Rx
              .Observable
              .returnValue('Tepid');
    Rx
        .Observable
        .returnValue('Boiling')
        .delay(delay) // boiling after 600 ms
        .timeout(timeout, timeoutEvent) // tepid after 500
        .subscribe(function(x) { received = x; });
    
    setTimeout(function() { equals(received, 'Cold'); start(); }, 450);
    setTimeout(function() { equals(received, 'Tepid'); start(); }, 550);
    setTimeout(function() { equals(received, 'Boiling'); start(); }, 1500);
});
 
