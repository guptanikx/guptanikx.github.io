// document.addEventListener("DOMContentLoaded", function (event) {
//     //do work
//     document.querySelectorAll("a.btn").forEach(x => {
//         x.setAttribute("target", "_blank");
//     })
// });

// Make Link open in blank
$(function () {
  $(".page-content a.blank").attr("target", "_blank");
  $(".page-content .toc a[href$='content'], .page-content .toc a[href$='toc']")
    .click(function (e) {
      var tgt = $(this).attr("href");
      console.log($(this).attr("href"));
      e.preventDefault();
      $(tgt).get(0).scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
});

//  Scroll To Top button
$(function () {
  $(window).on("scroll", function () {
    // console.log("scrolling");
    // console.log($(this).scrollTop());
    $(this).scrollTop() > 300 ? $(".back-to-top").fadeIn() : $(".back-to-top").fadeOut()
  }), $(".back-to-top").on("click", function () {
    return $("html, body").animate({
      scrollTop: 0
    }, 100), !1
  })
});

// Build Accordions
$(function () {
  var temp = `<div class="accordion-item">
                  <h2 class="accordion-header" id="__HEADING_ID__">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#__COLLAPSE_ID__" aria-expanded="true" aria-controls="__COLLAPSE_ID__">
                    __TITLE__
                  </button>
                  </h2>
                  <div id="__COLLAPSE_ID__" class="accordion-collapse collapse" aria-labelledby="__HEADING_ID__" data-bs-parent="#acc-cli">
                  <div class="accordion-body">
                    __BODY__
                  </div>
                  </div>
                </div>`;

  $(".cli ul li").each(function (i, v) {
    // console.log("found cli tags");
    var tagId = `coll_tag_${i}`;
    var collapseId = `coll_id_${i}`;
    var headingId = `coll_head_${i}`;
    var title = $(this).find("h1").text();
    var content = temp.replace(/__HEADING_ID__/gi, headingId)
      .replace(/__COLLAPSE_ID__/gi, collapseId)
      // .replace(/__TAG_ID__/gi, tagId)
      .replace(/__TITLE__/gi, title)
      ;

    // var sib = $(this)
    //   .siblings("div.language-json.highlighter-rouge");
    var sib = $(this)
      .find("div.highlighter-rouge");

    if (sib.length > 0) {
      // console.log(sib);
      content = content.replace(/__BODY__/gi, $(sib).html())
      // $(sib).replaceWith(content);
      // $(this).replaceWith(content);
      // .remove();
      $(this).parent().parent().append(content);
      $(this).remove();
    }
  });
})

// Image Modal
$(function () {
  var t_imgWrap = `<div class="container-fluid m-2" id="_WRAP_ID_">
                        <div class="row">
                          <div class="col-4 img-holder mx-auto"></div>
                          <div class="col-8"></div>
                        </div>
                    </div>`;
  var tModal = `<div class="modal fade" id="__ID__" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                      <div class="modal-content">
                        <div class="modal-body mx-auto">
                          
                        </div>
                      </div>
                    </div>
                </div>`;
  $(".page-content img").each(function (i) {
    var id = "r_" + i;
    var _t = tModal.replace("__ID__", id);
    if ($(this).attr('alt') === "Large") {
      _t = _t.replace("modal-dialog modal-lg", "modal-dialog modal-xl");
    }
    // console.log(id);
    $("body").append(_t);
    $(this).addClass("img-fluid");
    $(this).addClass("img-content");
    $(this).attr("modal_id", id);
    $("#" + id).find(".modal-body").append($(this).clone(false));

    var id_w = "w_" + i;
    var img_wrap = t_imgWrap.replace("_WRAP_ID_", id_w);
    $(this).replaceWith($(img_wrap));
    $("#" + id_w).find(".img-holder").append($(this).clone(false));

    // Attach Event
    $("#" + id_w).find("img").click(function (e) {
      e.preventDefault();
      var modal_id = $(this).attr("modal_id");
      var myModal = new bootstrap.Modal(document.getElementById(modal_id));
      myModal.show();
    });

  });
});


// // Wraps Alerts and Messages
// $(function () {
//   var t_info =
//     `<div class="alert border-0 border-warning border-start border-2 bg-light-info fade show py-1">
// 			<div class="d-flex align-items-center">
// 				<div class="ms-3">
// 				<div class="text-info">__TEXT__</div>
// 				</div>
// 			</div>
// 		</div>`;
//   $(".page-content ul.msg-info").each(function (i, v) {
//     var content = t_info.replace('__TEXT__', $(this).html());
//     $(this).replaceWith(content);
//   });
// });

// Wraps Alerts and Messages
$(function () {
  var t_warn =
    `<div class="alert border-0 border-warning border-start border-2 bg-light-warning fade show py-1">
				<div class="d-flex align-items-center">
					<div class="fs-5 text-warning"><i class="bi bi-exclamation-triangle-fill"></i>
					</div>
					<div class="ms-3 __PAD__">
					<div class="text-warning">__TEXT__</div>
					</div>
				</div>
			</div>`
  var t_info =
    `<div class="alert border-0 border-warning border-start border-2 bg-light-info fade show py-1">
				<div class="d-flex align-items-center">
					<div class="fs-5 text-info"><i class="bi bi-info-circle-fill"></i>
					</div>
					<div class="ms-3 __PAD__">
					<div class="text-info">__TEXT__</div>
					</div>
				</div>
			</div>`
  $("ul li p.msg-warn").each(function (i, v) {
    var t = t_warn.replace("__TEXT__", $(this).text());
    var parentEl = $(this).parent().parent();
    parentEl.before(t);
  });
  $("ul li p.msg-warn").parent().parent().remove();
  // Reaplace para with Alert Message
  $("p.msg-warn").each(function (i, v) {
    var temp = template.replace("__TEXT__", $(this).text());
    $(this).replaceWith(temp);
  });
  $("p.msg-info").each(function (i, v) {
    // console.log("found para with msg info");
    var temp = t_info.replace("__TEXT__", $(this).text());
    $(this).replaceWith(temp);
  });
  $("ul.msg-info").each(function (i, v) {
    // console.log($(this).parent().prop('tagName') === "LI");
    var temp = t_info.replace("__TEXT__", $(this).html());
    if ($(this).parent().prop('tagName') === "LI") {
      // padding to left
      temp = temp.replace("__PAD__", "ps-3");
    }
    $(this).replaceWith(temp);
  });
  $("ul.msg-warn").each(function (i, v) {
    var temp = t_warn.replace("__TEXT__", $(this).html());
    $(this).replaceWith(temp);
  });
});