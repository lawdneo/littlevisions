<template>
    <div class="story-text-panel story-build-panel">
        <div class="audio-controls">
            <div class="audio-indicator row default-gap" @click="playAudio">
                <i class="fa-solid fa-pause" v-if="playing"></i> 
                <i class="fa-solid fa-play" v-else></i>
                David
            </div>
        </div>
        <StoryText :text="storyboard.narrative" v-if="storyboard" :delay="70"/>
        <div class="story-controls">
            <div class="row space-btn">
                <div class="row default-gap label-indicator">


                    <button class="circle-btn center-container" @click="$emit('finishStory')">
                        <i class="fa fa-flag-checkered"> </i>
                    </button>
                    <i class="fa fa-arrow-left indicator"></i>
                    <p class="fancy-label">Finish Your Story</p>
                </div>
                <div class="row default-gap label-indicator">

                    <p class="fancy-label">Continue Your Story</p>
                    <i class="fa fa-arrow-right indicator"></i>
                    <button class="circle-btn center-container bg-primary" @click="$emit('continueStory')">
                        <i class="fa fa-step-forward"> </i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import StoryText from '@/components/story/StoryText.vue';
import api from '@/plugins/axios_utils';
import { Howl } from 'howler';
export default {
    components: {
        StoryText
    },
    props: {
        storyboard: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            narration_url: null,
            narration: null
        }
    },
    computed:{
        playing(){
            if(this.narration){
                return this.narration.playing()
            }
            return false
        }
    },
    methods: {
        playAudio() {
            if(!(this.narration && this.narration.playing())){

                this.narration= new Howl({
                    src: [this.narration_url],
                    autoplay: true
                })
            }
        },
        getAudio() {
            var story_id = this.$route.params['story_id']
            var board_id = this.$route.params['board_id']
            if ("narration_url" in this.$props.storyboard) {
                this.narration_url = this.$props.storyboard.narration_url
                this.playAudio()

            }
            else {
                api.get(`story/${story_id}/narration/generate/${board_id}`).then(res => {
                    this.narration_url = res.data.narration_url
                    this.playAudio()

                })
            }
        }
    },
    mounted() {
        this.getAudio()
    }
}
</script>