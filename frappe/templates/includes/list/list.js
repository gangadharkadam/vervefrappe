frappe.ready(function() {
	var next_start = {{ next_start }};
	var result_wrapper = $(".website-list .result");

	$(".website-list .btn-more").on("click", function() {
		return $.ajax({
			url:"/api/method/frappe.templates.pages.list.get",
			data: {
				doctype: "{{ doctype }}",
				txt: "{{ txt or '' }}",
				limit_start: next_start
			},
			statusCode: {
				200: function(data) {
					var data = data.message;
					next_start = data.next_start;
					$.each(data.result, function(i, d) {
						$(d).appendTo(result_wrapper);
					});
					toggle_more(data.show_more);
				}
			}
		});
	});

	var toggle_more = function(show) {
		if (!show) {
			$(".website-list .more-block").addClass("hide");
		}
	};
})
