define(
  'ephox.alloy.api.behaviour.Dragging',

  [
    'ephox.alloy.api.behaviour.Behaviour',
    'ephox.alloy.behaviour.dragging.DraggingBranches',
    'ephox.alloy.dragging.common.DragState',
    'ephox.katamari.api.Struct'
  ],

  function (Behaviour, DraggingBranches, DragState, Struct) {
    return Behaviour.createModes({
      branchKey: 'mode',
      branches: DraggingBranches,
      name: 'dragging',
      active: {
        events: function (dragConfig, dragState) {
          var dragger = dragConfig.dragger();
          return dragger.handlers(dragConfig, dragState);
        }
      },
      extra: {
        // Extra. Does not need component as input.
        snap: Struct.immutableBag([ 'sensor', 'range', 'output' ], [ 'extra' ])

      },
      state: DragState
    });
  }
);