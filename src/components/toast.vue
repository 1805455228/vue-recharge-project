<template>
  <div v-if="show" class="toast-text">{{message}}</div>
</template>

<script>
export default {
  data() {
    return {
		show:false,
		message:''
    };
  },
  methods: {
	  getParentParam:function(text){
		  console.log(text)
		  this.show = true
		  this.message = text;
		  setTimeout(() => {
			  this.show = false;
			  this.message = '';
		  }, 1.5 * 1000);
	  }
  },
};
</script>

<style>
	.toast-text{
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background: rgba(0, 0, 0,.6);
		padding: 3px 10px;
		z-index: 10;
		color: #fff;
		border-radius: 4px;
	}
</style>
