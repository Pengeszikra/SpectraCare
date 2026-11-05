const last=x=>Array.isArray(x)?x.at(-1):undefined;
const value=x=>typeof x==='number'&&Number.isFinite(x)?x:null;
export function normalizeMetrics(metrics,elapsed){
 const pulse=last(metrics.cardio?.pulseRate),breathing=last(metrics.breathing?.rate),hrv=last(metrics.cardio?.hrv),wave=last(metrics.breathing?.upperTrace);
 const valid=(m,after)=>elapsed>=after&&m&&m.confidence>0&&m.stable!==false;
 return {type:'metrics',pulse:valid(pulse,12)?value(pulse.value):null,breathing:valid(breathing,30)?value(breathing.value):null,hrv:valid(hrv,60)?value(hrv.rmssd):null,wave:valid(wave,30)?value(wave.value):null,confidence:value(breathing?.confidence)??value(pulse?.confidence)??0,stable:breathing?.stable===true||pulse?.stable===true};
}
