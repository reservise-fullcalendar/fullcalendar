describe('dayClick', function() {
	var options;

	beforeEach(function() {
		affix('#cal');
		options = {
			defaultDate: '2014-05-27',
			selectable: false
		};
	});

	afterEach(function() {
		$('#cal').fullCalendar('destroy');
	});

	[ false, true ].forEach(function(isRTL) {
		describe('when isRTL is ' + isRTL, function() {
			beforeEach(function() {
				options.isRTL = isRTL;
			});
			[ false, true ].forEach(function(selectable) {
				describe('when selectable is ' + selectable, function() {
					beforeEach(function() {
						options.selectable = selectable;
					});

					describe('when in month view', function() {
						beforeEach(function() {
							options.defaultView = 'month';
						});
						it('fires correctly when clicking on a cell', function(done) {
							options.dayClick = function(date, jsEvent, view) {
								expect(moment.isMoment(date)).toEqual(true);
								expect(typeof jsEvent).toEqual('object'); // TODO: more descrimination
								expect(typeof view).toEqual('object'); // "
								expect(date.hasTime()).toEqual(false);
								expect(date).toEqualMoment('2014-05-07');
							};
							spyOn(options, 'dayClick').and.callThrough();
							$('#cal').fullCalendar(options);
							var dayCell = $('.fc-day:eq(10)'); // 2014-05-07 (regardless of isRTL)
							dayCell.simulate('drag-n-drop', { // for simulating the mousedown/mouseup/click (relevant for selectable)
								callback: function() {
									dayCell.simulate('click');
									expect(options.dayClick).toHaveBeenCalled();
									done();
								}
							});
						});
					});
				});
			});
		});
	});
});