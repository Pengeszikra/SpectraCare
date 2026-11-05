export type Reading = {pulse:number|null; breathing:number|null; hrv:number|null; confidence:number; stable:boolean; wave:number|null; timestamp:number};
export const finite = (v:unknown):number|null => typeof v==='number' && Number.isFinite(v) ? v : null;
export const clamp = (v:number):number => Math.max(0,Math.min(100,v));
export function normalize(v:Record<string,unknown>):Reading {
 return {pulse:finite(v.pulse),breathing:finite(v.breathing),hrv:finite(v.hrv),confidence:(finite(v.confidence)??0) |> clamp,stable:v.stable===true,wave:finite(v.wave),timestamp:Date.now()};
}
export function demo(seconds:number,rate:number):Reading {
 return {pulse:seconds>=12? Math.round(68+3*Math.sin(seconds/9)):null,breathing:seconds>=30?rate:null,hrv:seconds>=60?Math.round(42+4*Math.sin(seconds/17)):null,confidence:Math.min(96,Math.round(seconds*4)),stable:true,wave:Math.sin(seconds*rate/60*Math.PI*2),timestamp:Date.now()};
}
export function path(values:number[],width=600,height=100):string {
 return values.map((v,i)=>`${i?'L':'M'}${(i/Math.max(1,values.length-1)*width).toFixed(1)},${(height/2-v*(height*.38)).toFixed(1)}`).join(' ');
}
export const displayValue = (n:number|null):string => n===null?'—':Math.round(n).toString();
