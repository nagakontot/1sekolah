var BoxCSG = function () {

    // dim:   dimension, i.e. "x","y" or "z"
    // state: {done:[box],todo:[box]}
    // box:   box to substract
    function subtractInDimension(dim, state, box) {
        var done = state.done,
          todo = [];
        while (state.todo.length) {
            var sut = state.todo.pop();
            if (sut.min[dim] > box.max[dim] ||
              sut.max[dim] < box.min[dim]) {
                done.push(sut);
                continue;
            }

            var minBox = sut.clone();
            var middleBox = sut.clone();
            var maxBox = sut.clone();

            var left = Math.max(sut.min[dim], box.min[dim]);
            var right = Math.min(sut.max[dim], box.max[dim]);

            minBox.max[dim] = left;
            middleBox.min[dim] = left;
            middleBox.max[dim] = right;
            maxBox.min[dim] = right;

            if (minBox.min[dim] < minBox.max[dim]) {
                done.push(minBox);
            }
            if (maxBox.min[dim] < maxBox.max[dim]) {
                done.push(maxBox);
            }
            if (middleBox.min[dim] < middleBox.max[dim]) {
                todo.push(middleBox);
            }
        }
        return {
            done: done,
            todo: todo
        };
    }

    function BoxCSG() {

    }


    BoxCSG.prototype.subtract = function (subtractee, subtractor) {
        if (Array.isArray(subtractor)) {
            return subtractor.reduce(function (acc, s) {
                return this.subtract(acc, s);
            }.bind(this), subtractee);
        }

        return "xyz".split("").reduce(function (acc, dim) {
            return subtractInDimension(dim, acc, subtractor);
        }, {
            done: [],
            todo: Array.isArray(subtractee) ? subtractee : [subtractee]
        }).done;
    };

    return BoxCSG;
}();
