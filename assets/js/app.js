
$(function () {
	"use strict";

	// Tooltops

	$(function () {
		$('[data-bs-toggle="tooltip"]').tooltip();
	})

	$(".nav-toggle-icon").on("click", function () {
		$(".wrapper").toggleClass("toggled")
	})

	$(".mobile-toggle-icon").on("click", function () {
		$(".wrapper").addClass("toggled")
	})

	$(function () {
		for (var e = window.location, o = $(".metismenu li a").filter(function () {
			return this.href == e
		}).addClass("").parent().addClass("mm-active"); o.is("li");) o = o.parent("").addClass("mm-show").parent("").addClass("mm-active")
	})

	// Sidebar Toggle Button
	$(".toggle-icon").click(function () {
		$(".wrapper").hasClass("toggled") ? ($(".wrapper").removeClass("toggled"), $(".sidebar-wrapper").unbind("hover")) : ($(".wrapper").addClass("toggled"), $(".sidebar-wrapper").hover(function () {
			$(".wrapper").addClass("sidebar-hovered")
		}, function () {
			$(".wrapper").removeClass("sidebar-hovered")
		}))
	})

	$(function () {
		$("#menu").metisMenu()
	})

	$(function () {
		// make all links open in new tab
		// $(".page-content a").attr('target', '_blank')
		// Decrease margin to li elements which are meant for code arguments
		$("ul li p.config-args").parent().addClass("mb-sm-1");
	})

	$(function () {
		// Make Numbered List
		$(".page-content ul li p.list-group-numbered").each(function (i, v) {
			$(this).parent().parent().addClass('list-group-numbered');
			$(this).find("a").unwrap();
		});
	});
});
