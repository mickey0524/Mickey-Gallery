<template>
  <div class="photo-container">
    <div class="gallery-title">
      > Gallery
    </div>
    <hr>
    <div id="photo">
      <ul>
        <li v-for="(photo, index) in photoMes">
          <figure class="photo-item">
            <a class="fancybox" :href="photo.indexAddress">
              <img :src="photo.address" :width="imgWidth" :height="imgHeight">
            </a>
            <div class="operation">
              <i class="fa fa-heart" @click="addLike(index)" v-if="photo.like"></i>
              <i class="fa fa-heart-o" @click="addLike(index)" v-else></i>
              <span><strong>{{ photo.photoLike }}</strong> Likes<span>
              <i class="fa fa-commenting-o" @click="openDetail"></i>
              <span @click="openDetail"><strong>{{ photo.photoComment }}</strong> Comments<span>
            </div>
          </figure>
        </li>
      </ul>
    </div>
    <detail v-if="showDetail" @close="showDetail = false" @routeToIntroduction="routeToIntroduction"></detail>
  </div>
</template>

<script>
  import Detail from './Detail.vue'
  export default {
    props : ['imgWidth', 'imgHeight'],
    components : {
      Detail
    },
    mounted : function() {
        var _this = this;
        var params = { userId : '' };
        if(this.$route.params.introductionId != undefined) {
          params.userId = this.$route.params.introductionId;
        }
        var resource = this.$resource('http://localhost:3000/getPhoto');
        resource.save(params).then((response) => {
          _this.photoMes = response.body.photo;
          for(var i in _this.photoMes) {
            _this.photoMes[i].address = require('../assets/port' + _this.photoMes[i].photoId + '.jpg');
            _this.photoMes[i].indexAddress = '/src/assets/port' + _this.photoMes[i].photoId + '.jpg';
            _this.photoMes[i].like = false;
            _this.photoMes[i].photoLike = Number(_this.photoMes[i].photoLike);
            _this.photoMes[i].photoComment = Number(_this.photoMes[i].photoComment);
          }
        })
        .catch((response) => {
          console.log('err ' + response);
        })  

        if(this.$route.params.userId !== 'visitor') {
          var resource_1 = this.$resource('http://localhost:3000/getLikePhoto');
          resource_1.save({userId : this.$route.params.userId}).then((response) => {
            for(var i in _this.photoMes) {
              if(response.body.photo.indexOf(_this.photoMes[i].photoId) != -1) {
                _this.photoMes[i].like = true;
              }
            }
          })
          .catch((response) => {
            console.log('err ' + response);
          })       
        } 
      },
    data () {
      return {
        showDetail : false,
        photoMes : [      
          // {
          //   photoId : '6',
          //   address : require('../assets/port06.jpg'),
          //   indexAddress : '/src/assets/port06.jpg',
          //   like : false,
          //   likeNum : 123,
          //   commentNum : 123
          // }
        ]
      };
    },
    methods : {
      addLike : function(index) {
        if(this.$route.params.userId == 'visitor') {
          this.$router.push('/login');
        }
        else {
          if(this.photoMes[index].like) {
            this.photoMes[index].photoLike -= 1;
            var resource_1 = this.$resource('http://localhost:3000/cutLike');
            var params_1 = {photoId : this.photoMes[index].photoId, userId : this.$route.params.userId};
          }
          else {
            this.photoMes[index].photoLike += 1;
            var resource_1 = this.$resource('http://localhost:3000/addLike');
            var params_1 = {photoId : this.photoMes[index].photoId, userId : this.$route.params.userId};
          }
          resource_1.save(params_1).then((response) => {
            if(response.body.code != 200) {
              alert(response.body.description);
            }            
          })
          .catch((response) => {
            console.log('err ' + response);
          })
          var resource = this.$resource('http://localhost:3000/changeLikeNum');
          var params = {id : this.photoMes[index].photoId, likeNum : this.photoMes[index].photoLike};
          resource.save(params).then((response) => {
            if(response.body.code != 200) {
              alert(response.body.description);
            }
          })
          .catch((response) => {
            console.log('err ' + response);
          })
          this.photoMes[index].like = !this.photoMes[index].like;         
        }
      },
      openDetail : function() {
        this.showDetail = true;
      },
      routeToIntroduction: function() {
        this.showDetail = false;
        this.$emit('routeToIntroduction');
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
