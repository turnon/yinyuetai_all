/**
 * Created by turnon on 2018/9/9.
 */
// ==UserScript==
// @name         yinyuetai-all
// @namespace    https://github.com/turnon/yinyuetai_all
// @version      0.0.3
// @description  yinyuetai
// @author       block24block@gmail.com
// @match       *://www.yinyuetai.com/fanclub/*
// @grant        none
// @require 	 https://cdn.bootcss.com/jquery/3.2.1/jquery.js
// ==/UserScript==
window.$$$ = jQuery.noConflict(true);

(function () {
  function start() {
    var $page_count = $$$(".page-nav span:last-child");
    var page_count = parseInt($page_count.text().replace(/[^0-9]/g, ""));

    var page_loaders = [];
    var base_url = window.location.href;
    for (var i = 2; i <= page_count; i++) {
      var next_page = base_url + "/" + i;
      page_loaders.push($$$.ajax({
        url: next_page
      }));
    }

    async function append_page(page_loader) {
      var data = await page_loader;
      var $mod = $$$(data).find(".mod");
      $mod.find(".thread_list").remove();
      $$$(".mod:last-child").after($mod);
    }

    (async function () {
      for (loader of page_loaders) {
        await append_page(loader);
      }
    })();

    $all.remove();
  }

  var $all = $$$('<a href="#">load all</a>');
  $$$(".page-nav span:last-child").before($all);
  $all.click(start);
})();