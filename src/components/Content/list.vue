<template>
    <div class="list" @scroll="scrollWarp($event)">
        <div class="index-list">
            <div class="title-fixed" v-if='scrollTop > 0'>{{nodeLetter}}</div>
            <div class="item" v-for='item in ListArry'>
                <a href="javascript:;" class="item-title">
                    {{item.letter}}
                </a>
                <div class="item-name" v-for='list in item.data'>{{list}}</div>
            </div>
        </div>
        <div class="mod-list" :class="{shade:addClass}">
            <div class="indexlist-navlist" @touchstart='touchStart($event)' @touchmove="touchMove($event)" @touchend='touchEnd'>
                <a  @click="gotoIndex(i)" v-for='(list,i) in ListArry' class="indexlist-navitem">
                    <b class="index-txt">{{list.letter}}</b>
                    <i class="bubble" :class="{show:i == bubbleIsShow}">{{list.letter}}</i>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { traverseDF,pySegSort,getElementsClass } from '../common/mixins.js'

export default {
    name:'List',
    data(){
        return{
            ListArry:'',
            scrollTop:'',
            nodeLetter:'',
            addClass:false,
            bubbleIsShow:null
        }
    },
    created(){
        let listDataName = []
        let listDataPartner = []
        let listData = []

        traverseDF(this.$store.getters.getFoldersArry).forEach( data => {
            if(!!data.partner){
                listDataPartner = listDataPartner.concat(data.partner)
            }
            listDataName = listDataName.concat(data.name)
        })

        listData = listDataName.concat(listDataPartner)
        this.ListArry =  pySegSort(listData)
    },
    methods:{
        scrollWarp(e){
            this.scrollTop = e.target.scrollTop
            getElementsClass('item').forEach((event,i)=>{
                if(e.target.scrollTop >= event.offsetTop ){
                    this.nodeLetter = this.ListArry[i].letter
                }
            })
        },
        gotoIndex(i){
            getElementsClass('item')[i].scrollIntoView()
            this.bubbleIsShow = i
        },
        touchStart(event){
            event.preventDefault()
            this.addClass = true
        },
        touchMove(event){
            event.preventDefault()
            var a = document.elementFromPoint(event.touches[0].clientX,event.touches[0].clientY);
            a.click()
        },
        touchEnd(){
            this.addClass = false
            this.bubbleIsShow = null
        }
    }
}
</script>
<style scoped>
.list{
    position: static;
    top: 0;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}

.mod-list,.indexlist-navlist{
    margin: 0;
    max-height: 100%;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
}

.indexlist-navlist{
    position: relative;
    z-index: 10;
}

.mod-list.shade{
    width: 100%;
}

.mod-list.shade .indexlist-navlist{
    position: absolute;
    width: 100%;
    right: 0;
}

.mod-list.shade .indexlist-navlist a.indexlist-navitem{
    display: block;
    padding-right: .46875rem /* 7.5/16 */;
}

b.index-txt{
    width: 1.5rem /* 24/16 */;
    height: 1.5rem /* 24/16 */;
    display: block;
    text-align: center;
    position: absolute;
    right: 0;
    top: 0;
}

i.bubble{
    position: absolute;
    width: 3.125rem /* 50/16 */;
    height: 3.125rem /* 50/16 */;
    text-align: center;
    line-height: 3.125rem /* 50/16 */;
    right: 3.75rem /* 60/16 */;
    top: 50%;
    margin-top: -1.5625rem /* 25/16 */;
    display: block;
    background: #333;
    color: #fff;
    border-radius: 50%;
    display: none;
    font-size: 1.5rem /* 24/16 */;
    font-style: normal;
    font-weight: 200;
}

i.bubble::before{
    content: '';
    width: 0;
    height: 0;
    border-top: 1.25rem /* 20/16 */ solid transparent;
    border-left: 1.25rem /* 20/16 */ solid #333;
    border-bottom: 1.25rem /* 20/16 */ solid transparent;
    position: absolute;
    left: 2.25rem /* 36/16 */;
    top: 50%;
    margin-top: -1.25rem /* 20/16 */;
}

i.bubble.show{
    display: block;
}

.mod-list{
    position: fixed;
    right: 0;
    top: 0;
    width: 1.5rem /* 24/16 */;
    height: 100%;
    justify-content: center;
    -webkit-box-pack: center;
}

.indexlist-navitem{
    font-size: .75rem /* 12/16 */;
    -webkit-touch-callout: none;
    user-select: none;
    -webkit-touch-callout: none;
    font-weight: 700;
}

a.indexlist-navitem{
    display: block;
    color: #0c64ff;
    height: 1.5rem /* 24/16 */;
    line-height: 1.5rem /* 24/16 */;
    position: relative;
}

.index-list{
    padding-bottom: 2.8125rem /* 45/16 */;
}

.item{
    width: 100%;
    border-top: 1px solid #ededed;
}

.title-fixed{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
}

a.item-title{
    display: block;
    color: #333;
}

.item-title,.title-fixed{
    height: 2rem /* 32/16 */;
    line-height: 2rem /* 32/16 */;
    background: #f2f2f2;
    padding-left: 1.25rem /* 20/16 */;
}

.item-name{
    height: 3rem /* 48/16 */;
    line-height: 3rem /* 48/16 */;
    padding-left: 1.25rem /* 20/16 */;
    color: #333;
    position: relative;
}

.item-name::before{
    content: '';
    position: absolute;
    width: 95%;
    height: 1px;
    background: #ededed;
    bottom: 0;
    right: 0;
}

.item-name:last-of-type::before{
    display: none;
}

.item-name:active{
    background: #f2f2f2;
}
</style>
