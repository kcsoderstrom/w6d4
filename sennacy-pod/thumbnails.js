$.Thumbnails = function (el) {
  this.$el = $(el);
  this.bindEvents();
  this.gutterIdx = 0;
  this.$images = this.$el.find("img");
  this.fillGutterImages();
  this.$activeImg = this.$el.find('img:first');
  this.activate();

};

$.Thumbnails.prototype.bindEvents = function () {
  var that = this;

  this.$el.on('mouseenter', 'img', function(event) {
    event.preventDefault();
    that.$activeImg = $(event.currentTarget)
    that.activate();
  });

  this.$el.on('mouseleave', 'img', function (event) {
    event.preventDefault();
    that.activate();
  });

  this.$el.on('click', '.nav', function(event) {
    var id = $(event.currentTarget).attr("id");
    if(id === "right") {
      if(that.gutterIdx < that.$images.length - 5) {
        that.gutterIdx += 1;
      }
    } else if (id === "left") {
      if(that.gutterIdx > 0) {
        that.gutterIdx -= 1;
      }
    }

    that.fillGutterImages();
  });
};

$.Thumbnails.prototype.activate = function () {
  this.$el.find('figure.active').empty();
  var $cloned = this.$activeImg.clone();
  this.$el.find('figure.active').append($cloned);
};

$.Thumbnails.prototype.fillGutterImages = function () {
  var $ul = this.$el.find('ul')
  $ul.empty();

  for (var i = this.gutterIdx; i < this.gutterIdx + 5; i++) {
    $ul.append("<li></li>");
    $ul.find("li:last").append(this.$images.eq(i));
  };
};

$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};