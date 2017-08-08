/**
 * Created by ZhuJiaCong on 2017/6/2.
 */

//使用js来设置轮播图中每一项的背景图片，根据屏幕尺寸来决定使用的是大图还是小图
$(function(){

  function resizeWindow(){
      // 获取屏幕宽度值
      var windowWidth = $(window).width();
      // 判断屏幕大小
      var isSmallScreen = windowWidth<768;
      // 查找item对象
      var items = $("#main_ad > .carousel-inner > .item");
      // 遍历设置背景图片
      items.each(function(i,item){
          var $item = $(item);
          // 根据屏幕大小判断获取图片名称
          var imageName = isSmallScreen ? $item.data().imageSmall : $item.data().imageLarge;
          // 图片URL
          var imageURL = "url('"+imageName+"')";
          // 设置背景图片
         $item.css("background-image", imageURL);
         // 当是小屏幕状态的时候，轮播图的宽度等于屏幕宽度
          if (isSmallScreen) {
            $item.height((windowWidth/640 * 340)+"px");
          } else {
            $item.height("410px");
          }
      });



      //tab的左右滑动效果，计算总宽度
      var width_sum = 20;
      $("ul.nav-tabs").children().each(function(index, li){
          width_sum += li.clientWidth;
      });
      var wrapper = $(".ul_wrapper");
      if (width_sum > wrapper.width()) {
        wrapper.css("overflow-x", "scroll");
        $("ul.nav-tabs").width(width_sum);
      } else {
        wrapper.css("overflow-x", "hidden");
        $("ul.nav-tabs").css("width", "100%");
      }

      // tooltip的houver效果
    $('[data-toggle="tooltip"]').tooltip()
    $("#news-tabs-list").children().children("a").on("click", function(e,i){
      var $a = $(this);
      $("#news-title").text($a.data().title);
    });

    // 轮播图左右滑动效果
    var startX;
    var endX;
    var carousel = $("#main_ad")
    carousel.on("touchstart", function(event){
      startX = event.touches[0].clientX;
      endX = event.touches[0].clientX;
    });
    carousel.on("touchmove", function(event){
      endX = event.touches[0].clientX;
    });
    carousel.on("touchend", function(event){
      if (100 < endX - startX) {
        carousel.carousel("prev");
      } else if(100 < startX - endX) {
        carousel.carousel("next");
      }
    });

};

$(window).on("resize", resizeWindow).trigger("resize");
});


