define(
  'ephox.dragster.api.MouseDrag',

  [
    'ephox.dragster.api.DragApis',
    'ephox.dragster.detect.Blocker',
    'ephox.perhaps.Option',
    'ephox.syrup.alien.Position',
    'ephox.syrup.api.DomEvent',
    'ephox.syrup.api.Insert',
    'ephox.syrup.api.Remove'
  ],

  function (DragApis, Blocker, Option, Position, DomEvent, Insert, Remove) {
    var compare = function (old, nu) {
      return Position(nu.left() - old.left(), nu.top() - old.top());
    };

    var extract = function (event) {
      return Option.some(Position(event.x(), event.y()));
    };

    var mutate = function (mutation, info) {
      mutation.mutate(info.left(), info.top());
    };

    var sink = function (dragApi, settings) {
      var blocker = Blocker(settings);

      // Included for safety. If the blocker has stayed on the screen, get rid of it on a click.
      var mdown = DomEvent.bind(blocker.element(), 'mousedown', dragApi.forceDrop);

      var mup = DomEvent.bind(blocker.element(), 'mouseup', dragApi.drop);
      var mmove = DomEvent.bind(blocker.element(), 'mousemove', dragApi.move);
      var mout = DomEvent.bind(blocker.element(), 'mouseout', dragApi.delayDrop);

      var destroy = function () {
        blocker.destroy();
        mup.unbind();
        mmove.unbind();
        mout.unbind();
        mdown.unbind();
      };

      var start = function (parent) {
        Insert.append(parent, blocker.element());
      };

      var stop = function () {
        Remove.remove(blocker.element());
      };

      return DragApis.sink({
        element: blocker.element,
        start: start,
        stop: stop,
        destroy: destroy
      });
    };

    return DragApis.mode({
      compare: compare,
      extract: extract,
      sink: sink,
      mutate: mutate
    });
  }
);