/**
 * Created by alison_lin on 15/12/5.
 */
function on(ele,type,fn){  //主要解决顺序问题
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
    }else{
        if(!ele["aEvent"+type]){ //如果没有这样一个程序池
            ele["aEvent"+type]=[];
            ele.attachEvent("on"+type,function(){run.call(ele)},false);
        }
        var a=ele["aEvent"+type];
        for(var i=0;i<a.length;i++){
            if(a[i]==fn){
                return;
            }
        }
        a.push(fn);
    }

}
function run(){
    var e=window.event;
    if(!e.target){
        e.target= e.srcElement;
        e.stopPropagation=function(){e.cancelBubble=true}
        e.preventDefault=function(){e.returnValue=false}
        e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
        e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
    }
    var a=this["aEvent"+e.type];
    for(var i=0;i<a.length;i++){
        if(typeof a[i]=="function"){
            a[i].call(this,e)
        }else{
            a.splice(i,1);
            i--;
        }
    }
}
function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{
        var a=ele["aEvent"+type];
        if(a){
            for(var i=0;i<a.length;i++){
                if(a[i]==fn){
                    a[i]=null;
                    return;
                }
            }
        }
    }

}