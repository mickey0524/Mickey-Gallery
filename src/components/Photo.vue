
<template>
  <div class="photo-container">
    <div class="gallery-title">
      > Gallery
    </div>
    <hr>
    <div id="photo">
      <ul>
        <li v-for="(photo, index) in photoContent">
          <figure class="photo-item">
            <a class="fancybox" :href="photo.indexAddress">
              <img :src="photo.address" :width="imgWidth" :height="imgHeight">
            </a>
            <div class="operation">
              <i class="fa fa-heart" @click="addLike(index)" v-if="photo.like"></i>
              <i class="fa fa-heart-o" @click="addLike(index)" v-else></i>
              <span><strong>{{ photo.likeNum }}</strong> Likes<span>
              <i class="fa fa-commenting-o" @click="openDetail"></i>
              <span @click="openDetail"><strong>{{ photo.commentNum }}</strong> Comments<span>
            </div>
          </figure>
        </li>
      </ul>
    </div>
    <detail v-if="showDetail" @close="showDetail = false"></detail>
  </div>
</template>

<script>
  import Detail from './Detail.vue'
  export default {
    props : ['imgWidth', 'imgHeight'],
    components : {
      Detail
    },
    data () {
      return {
        showDetail : false,
        photoContent : [
          {
            photoId : '1',
            address : require('../assets/port01.jpg'),
            indexAddress : '/src/assets/port01.jpg',
            like : false,
            likeNum : 123,
            commentNum : 123
          },
          {
            photoId : '2',
            address : require('../assets/port02.jpg'),
            indexAddress : '/src/assets/port02.jpg',
            like : false,
            likeNum : 123,
            commentNum : 123
          },
          {
            photoId : '3',
            address : require('../assets/port03.jpg'),
            indexAddress : '/src/assets/port03.jpg',
            like : false,
            likeNum : 123,
            commentNum : 123
          },
          {
            photoId : '4',
            address : require('../assets/port04.jpg'),
            indexAddress : '/src/assets/port04.jpg',
            like : false,
            likeNum : 123,
            commentNum : 123
          },
          {
            photoId : '5',  
            address : require('../assets/port05.jpg'),
            indexAddress : '/src/assets/port05.jpg',
            like : false,
            likeNum : 123,
            commentNum : 123
          },
          {
            photoId : '6',
            address : require('../assets/port06.jpg'),
            indexAddress : '/src/assets/port06.jpg',
            like : false,
            likeNum : 123,
            commentNum : 123
          }
        ]
      };
    },
    methods : {
      addLike : function(index) {
        if(this.photoContent[index].like) {
          this.photoContent[index].likeNum -= 1;
        }
        else {
          this.photoContent[index].likeNum += 1;
        }
        this.photoContent[index].like = !this.photoContent[index].like;
      },
      openDetail : function() {
        this.showDetail = true;
      }
    }
  }
</script>

<style>
  @import url("../css/jquery.fancybox.css");
  @import url("../css/font-awesome.min.css");
  @import url(http://fonts.googleapis.com/css?family=Ruda:400,700,900);
  * {
    font-family: 'Ruda', 'Microsoft Yahei', 'Arial', sans-serif;
  }
  .photo-container {
    text-align: center;
  }
  .gallery-title {
    text-align: left;
  }
  #photo ul li {
    display: inline-block;
    list-style: none;
    margin: 10px;
  }
  .operation {
    text-align: left;
    color: #000;
  }
  .operation i {
    cursor : pointer;
    color : #FF3757;
    margin-left : 20px;
  }
  .operation span {
    cursor: pointer;
  }
  .photo-item img {
    cursor : zoom-in;
  }
  .gallery-title {
    margin-bottom: 16px;
    font-size: 22px;
    color: #797C8B;
  }
</style>
