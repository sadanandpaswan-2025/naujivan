import { useState } from "react";

function getNumerology(name) {
  if(!name || typeof name !== "string") return 1;
  const map = { a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8 };
  // For non-English scripts, use charCode based numerology
  const hasEnglish = /[a-zA-Z]/.test(name);
  let sum;
  if(hasEnglish) {
    sum = name.toLowerCase().split("").reduce((acc,c) => acc+(map[c]||0), 0);
  } else {
    // Use char codes for Indian scripts — sum all char codes, reduce to 1-9
    sum = name.split("").reduce((acc,c) => acc + c.charCodeAt(0), 0);
  }
  if(!sum || sum === 0) return 1;
  // Reduce to single digit 1-9
  while(sum > 9) sum = String(sum).split("").reduce((a,d) => a + parseInt(d), 0);
  return sum || 1;
}

const NUM_INFO = {
  1:{label:"Leader",desc:"Strong & independent",color:"#ff6b35"},
  2:{label:"Peacemaker",desc:"Gentle & loving",color:"#6a0572"},
  3:{label:"Creative",desc:"Joyful & artistic",color:"#f0a500"},
  4:{label:"Stable",desc:"Reliable & grounded",color:"#2196f3"},
  5:{label:"Adventurer",desc:"Curious & dynamic",color:"#4caf50"},
  6:{label:"Nurturer",desc:"Caring & family-oriented",color:"#ff5722"},
  7:{label:"Wise",desc:"Spiritual & intuitive",color:"#607d8b"},
  8:{label:"Achiever",desc:"Ambitious & successful",color:"#795548"},
  9:{label:"Humanitarian",desc:"Compassionate & kind",color:"#009688"},
};

function getPopularity(name) {
  const seed = name.split("").reduce((a,c)=>a+c.charCodeAt(0),0);
  return ((seed*137)%91)+10;
}

const INDIAN_LANGUAGES = [
  { code:"hindi",    name:"हिंदी",     englishName:"Hindi",     flag:"🔵", region:"UP, MP, Delhi",     instruction:"Generate names in Hindi culture. Provide meaning in Hindi (Devanagari script) AND English." },
  { code:"bengali",  name:"বাংলা",     englishName:"Bengali",   flag:"🟢", region:"West Bengal",        instruction:"Generate Bengali baby names. Provide meaning in Bengali script AND English." },
  { code:"telugu",   name:"తెలుగు",    englishName:"Telugu",    flag:"🟡", region:"Andhra, Telangana",  instruction:"Generate Telugu baby names. Provide meaning in Telugu script AND English." },
  { code:"marathi",  name:"मराठी",     englishName:"Marathi",   flag:"🟠", region:"Maharashtra",        instruction:"Generate Marathi baby names. Provide meaning in Marathi (Devanagari) AND English." },
  { code:"tamil",    name:"தமிழ்",     englishName:"Tamil",     flag:"🔴", region:"Tamil Nadu",         instruction:"Generate Tamil baby names. Provide meaning in Tamil script AND English." },
  { code:"gujarati", name:"ગુજરાતી",   englishName:"Gujarati",  flag:"🟣", region:"Gujarat",            instruction:"Generate Gujarati baby names. Provide meaning in Gujarati script AND English." },
  { code:"kannada",  name:"ಕನ್ನಡ",     englishName:"Kannada",   flag:"🟤", region:"Karnataka",          instruction:"Generate Kannada baby names. Provide meaning in Kannada script AND English." },
  { code:"malayalam",name:"മലയാളം",    englishName:"Malayalam", flag:"⚪", region:"Kerala",             instruction:"Generate Malayalam baby names. Provide meaning in Malayalam script AND English." },
  { code:"punjabi",  name:"ਪੰਜਾਬੀ",    englishName:"Punjabi",   flag:"🔶", region:"Punjab",             instruction:"Generate Punjabi/Sikh baby names. Provide meaning in Gurmukhi AND English." },
  { code:"odia",     name:"ଓଡ଼ିଆ",     englishName:"Odia",      flag:"🔷", region:"Odisha",             instruction:"Generate Odia baby names. Provide meaning in Odia script AND English." },
];

const ALPHABET = ["All",..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

const WEEK_INFO = {
  4:{size:"Poppy seed 🌱",dev:"Fertilized egg implants. Heart begins forming.",tip:"Start folic acid supplements immediately.",emoji:"🌱",weight:"<1g",length:"0.1cm"},
  8:{size:"Raspberry 🫐",dev:"All major organs forming. Heart is beating 150 times/min!",tip:"Avoid alcohol, smoking and raw foods.",emoji:"🫐",weight:"1g",length:"1.6cm"},
  12:{size:"Lime 🍋",dev:"Fingers & toes formed. Baby can open/close fists. Nails forming.",tip:"First trimester almost over! Morning sickness may ease.",emoji:"🍋",weight:"14g",length:"5.4cm"},
  16:{size:"Avocado 🥑",dev:"Baby can hear your voice. Facial features clear. Hair growing.",tip:"Sleep on your side for better circulation.",emoji:"🥑",weight:"100g",length:"11.6cm"},
  20:{size:"Banana 🍌",dev:"Halfway! Baby is moving a lot. Swallowing amniotic fluid. Baby ke features clear ho rahe hain.",tip:"Anomaly scan is week hota hai — baby ki sehat check hoti hai. PCPNDT Act: India mein fetal gender puchna/batana kanoon ke viruddh hai. 🇮🇳",emoji:"🍌",weight:"300g",length:"16.4cm"},
  24:{size:"Corn 🌽",dev:"Lungs developing. Baby responds to light & sound. Fingerprints formed.",tip:"Start talking and reading to your baby!",emoji:"🌽",weight:"600g",length:"21cm"},
  28:{size:"Eggplant 🍆",dev:"Brain developing rapidly. Eyes can open & close. REM sleep begins.",tip:"Third trimester begins. Rest more often.",emoji:"🍆",weight:"1kg",length:"25cm"},
  32:{size:"Squash 🎃",dev:"Baby gaining weight fast. Practicing breathing. Bones hardening.",tip:"Pack your hospital bag this week.",emoji:"🎃",weight:"1.7kg",length:"28cm"},
  36:{size:"Honeydew 🍈",dev:"Almost full term. Head down position. Lungs nearly ready.",tip:"Watch for signs of labor.",emoji:"🍈",weight:"2.6kg",length:"33cm"},
  40:{size:"Watermelon 🍉",dev:"Full term! Baby ready to meet you! All organs fully developed.",tip:"Due date week — stay calm, you've got this! 💕",emoji:"🍉",weight:"3.4kg",length:"36cm"},
};

const PREGNANCY_TESTS = [
  {weeks:"4-8",   title:"Pregnancy Confirm",     tests:["Urine pregnancy test (UPT)","Blood HCG (beta) test","Blood group & Rh factor"],icon:"🧪"},
  {weeks:"8-12",  title:"Pehli Checkup",          tests:["Hemoglobin & CBC test","Thyroid (TSH) test","Blood sugar (fasting)","Urine routine & culture","VDRL (syphilis)","HIV & Hepatitis B,C","Rubella IgG test","Blood pressure & weight"],icon:"🩺"},
  {weeks:"11-14", title:"1st Trimester Screening", tests:["NT Scan — Nuchal Translucency Ultrasound","Double Marker Test — PAPP-A + Free Beta HCG","(Ye Down Syndrome screen karta hai)","Nasal bone check in ultrasound"],icon:"🔬"},
  {weeks:"15-20", title:"2nd Trimester Markers",   tests:["Triple Marker Test — AFP + HCG + Estriol","Quad Marker Test — AFP + HCG + Estriol + Inhibin A","(Neural tube defects & chromosomal abnormalities screen)","Amniocentesis (agar marker abnormal ho toh)"],icon:"🧬"},
  {weeks:"18-22", title:"Anomaly Scan",            tests:["Level 2 Ultrasound — Anomaly Scan","Fetal heart 4-chamber check","Brain, spine, kidneys, limbs check","Placenta position","Amniotic fluid level (AFI)","⚠️ Note: PCPNDT Act ke under fetal gender batana India mein illegal hai"],icon:"👶"},
  {weeks:"24-28", title:"Glucose & Growth",        tests:["GCT — Glucose Challenge Test (1 hour)","GTT — Glucose Tolerance Test (3 hour, if GCT fails)","(Gestational Diabetes screen karta hai)","Hemoglobin recheck","Fetal movement tracking start karo","Blood pressure monitoring"],icon:"🩸"},
  {weeks:"28-32", title:"3rd Trimester Start",     tests:["Growth Scan Ultrasound","Anti-D injection (Rh negative maa ko)","Iron & Calcium levels","TT injection (Tetanus Toxoid) 1st dose","Repeat CBC & blood sugar"],icon:"📊"},
  {weeks:"32-36", title:"Regular Monitoring",      tests:["Fetal position check","Biophysical Profile (BPP) — score out of 8","Non-Stress Test (NST) — fetal heart monitoring","TT injection 2nd dose","Repeat urine test","Group B Streptococcus (GBS) swab test"],icon:"❤️"},
  {weeks:"36-40", title:"Pre-Birth Prep",          tests:["Weekly BP & weight check","Doppler study (placenta blood flow)","Bishop Score (cervix readiness)","NST weekly","Hospital bag ready ✅","Birth plan discussion with doctor"],icon:"🏥"},
];

function getWeekInfo(w) {
  const keys = Object.keys(WEEK_INFO).map(Number).sort((a,b)=>a-b);
  for(let i=keys.length-1;i>=0;i--) if(w>=keys[i]) return WEEK_INFO[keys[i]];
  return WEEK_INFO[4];
}

function getTrimester(w) {
  if(w<=12) return {name:"1st Trimester",emoji:"🌸"};
  if(w<=26) return {name:"2nd Trimester",emoji:"🌷"};
  return {name:"3rd Trimester",emoji:"🌺"};
}

export default function App() {
  const [tab, setTab] = useState("pregnancy");
  const [namesTab, setNamesTab] = useState("regional"); // regional | explore | couple | custom

  // Pregnancy
  const [lmpDate, setLmpDate] = useState("");
  const [result, setResult] = useState(null);

  // Regional language names
  const [selLang, setSelLang] = useState(null);
  const [regGender, setRegGender] = useState("boy");
  const [regLetter, setRegLetter] = useState("All");
  const [regNames, setRegNames] = useState([]);
  const [regLoading, setRegLoading] = useState(false);

  // Explore
  const [expGender, setExpGender] = useState("boy");
  const [expLetter, setExpLetter] = useState("All");
  const [expNames, setExpNames] = useState([]);
  const [expLoading, setExpLoading] = useState(false);

  // Couple
  const [husband, setHusband] = useState("");
  const [wife, setWife] = useState("");
  const [coupleGender, setCoupleGender] = useState("boy");
  const [coupleNames, setCoupleNames] = useState([]);
  const [coupleLoading, setCoupleLoading] = useState(false);

  // Custom AI
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGender, setAiGender] = useState("boy");
  const [aiNames, setAiNames] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  // Saved & detail
  const [saved, setSaved] = useState([]);
  const [detail, setDetail] = useState(null);
  const [viewWeek, setViewWeek] = useState(null); // for prev/next week navigation

  function getZodiac(date) {
    const d=date.getDate(), m=date.getMonth()+1;
    if((m===3&&d>=21)||(m===4&&d<=19)) return {sign:"Mesh (Aries)",symbol:"♈",hindi:"मेष"};
    if((m===4&&d>=20)||(m===5&&d<=20)) return {sign:"Vrishabh (Taurus)",symbol:"♉",hindi:"वृषभ"};
    if((m===5&&d>=21)||(m===6&&d<=20)) return {sign:"Mithun (Gemini)",symbol:"♊",hindi:"मिथुन"};
    if((m===6&&d>=21)||(m===7&&d<=22)) return {sign:"Kark (Cancer)",symbol:"♋",hindi:"कर्क"};
    if((m===7&&d>=23)||(m===8&&d<=22)) return {sign:"Simha (Leo)",symbol:"♌",hindi:"सिंह"};
    if((m===8&&d>=23)||(m===9&&d<=22)) return {sign:"Kanya (Virgo)",symbol:"♍",hindi:"कन्या"};
    if((m===9&&d>=23)||(m===10&&d<=22)) return {sign:"Tula (Libra)",symbol:"♎",hindi:"तुला"};
    if((m===10&&d>=23)||(m===11&&d<=21)) return {sign:"Vrishchik (Scorpio)",symbol:"♏",hindi:"वृश्चिक"};
    if((m===11&&d>=22)||(m===12&&d<=21)) return {sign:"Dhanu (Sagittarius)",symbol:"♐",hindi:"धनु"};
    if((m===12&&d>=22)||(m===1&&d<=19)) return {sign:"Makar (Capricorn)",symbol:"♑",hindi:"मकर"};
    if((m===1&&d>=20)||(m===2&&d<=18)) return {sign:"Kumbh (Aquarius)",symbol:"♒",hindi:"कुंभ"};
    return {sign:"Meen (Pisces)",symbol:"♓",hindi:"मीन"};
  }

  function FetusIllustration({week}) {
    const w=Math.min(Math.max(week,4),40);
    const skin="#F4A574",skinD="#D4845A",skinL="#FBBF96",skinS="#C47040";
    const hair=w<20?"#C8956C":w<30?"#8B4513":"#5C3317";
    const cheek="rgba(255,120,100,0.28)",eyeCol="#2C1A6E";
    const bg=w<=12?"linear-gradient(160deg,#e8f4fd 0%,#c8e8f8 100%)":w<=26?"linear-gradient(160deg,#fde8f4 0%,#f8d0e8 100%)":"linear-gradient(160deg,#f0fde8 0%,#d0f0c8 100%)";
    const sacStroke=w<=12?"rgba(80,160,220,0.45)":w<=26?"rgba(220,80,160,0.45)":"rgba(80,200,100,0.45)";
    const sacFill=w<=12?"rgba(180,220,250,0.35)":w<=26?"rgba(250,180,220,0.35)":"rgba(180,250,200,0.35)";
    const label=w<8?"Embryo ban raha hai 🌱":w<14?"Dil dhadak raha hai 💓":w<22?"Face clear ho raha hai ✨":w<30?"Kick maar raha hai 🦶":w>=38?"Ab milenge! 🎉":"Head neeche, taiyaar! 💕";
    const sizeLabel=w<=12?"Chhota sa 🤏":w<=26?"Badh raha hai 📈":"Poora taiyaar! 💪";
    return (
      <div style={{borderRadius:24,overflow:"hidden",marginBottom:14,boxShadow:"0 8px 32px rgba(0,0,0,0.12)"}}>
        <div style={{background:bg,padding:"16px 16px 12px",textAlign:"center",position:"relative"}}>
          {/* Floating bubbles */}
          {[{x:8,y:15,r:12},{x:88,y:10,r:8},{x:94,y:80,r:10},{x:5,y:75,r:9}].map((b,i)=>(
            <div key={i} style={{position:"absolute",left:`${b.x}%`,top:`${b.y}%`,width:b.r*2,height:b.r*2,borderRadius:"50%",background:"rgba(255,255,255,0.55)"}}/>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,position:"relative",zIndex:2}}>
            <div style={{background:"rgba(255,255,255,0.85)",borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:800,color:"#ff6b35"}}>Week {w}</div>
            <div style={{background:"rgba(255,255,255,0.85)",borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:700,color:"#6a0572"}}>{w<=12?"🌸 1st":w<=26?"🌷 2nd":"🌺 3rd"} Trimester</div>
          </div>
          <svg width="260" height="260" viewBox="0 0 260 260" style={{margin:"0 auto",display:"block",filter:"drop-shadow(0 4px 16px rgba(0,0,0,0.12))"}}>
            <defs>
              <radialGradient id="sacG" cx="45%" cy="40%" r="60%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.7)"/>
                <stop offset="100%" stopColor={sacFill}/>
              </radialGradient>
              <radialGradient id="skinG3D" cx="35%" cy="28%" r="68%">
                <stop offset="0%" stopColor={skinL}/>
                <stop offset="45%" stopColor={skin}/>
                <stop offset="100%" stopColor={skinD}/>
              </radialGradient>
              <radialGradient id="headG3D" cx="38%" cy="30%" r="65%">
                <stop offset="0%" stopColor={skinL}/>
                <stop offset="50%" stopColor={skin}/>
                <stop offset="100%" stopColor={skinS}/>
              </radialGradient>
              <filter id="soft3D">
                <feDropShadow dx="2" dy="4" stdDeviation="5" floodColor="rgba(0,0,0,0.18)"/>
              </filter>
              <filter id="heartGlow">
                <feGaussianBlur stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Amniotic sac */}
            <ellipse cx="130" cy="130" rx="108" ry="113" fill="url(#sacG)" stroke={sacStroke} strokeWidth="2.5"/>
            {/* Sac shine */}
            <ellipse cx="98" cy="82" rx="28" ry="18" fill="rgba(255,255,255,0.5)" transform="rotate(-20,98,82)"/>
            <ellipse cx="108" cy="130" rx="90" ry="95" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>

            {/* ===== WEEK 4-7 ===== */}
            {w<=7&&<>
              <ellipse cx="130" cy="138" rx="14" ry="20" fill="url(#skinG3D)" filter="url(#soft3D)"/>
              <circle cx="130" cy="115" r="12" fill="url(#headG3D)" filter="url(#soft3D)"/>
              <circle cx="134" cy="112" r="2.5" fill={eyeCol} opacity="0.7"/>
              <path d="M 130 127 Q 133 133 130 158" fill="none" stroke={skinD} strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
              <circle cx="148" cy="125" r="9" fill="rgba(255,230,100,0.8)" stroke="rgba(220,180,50,0.6)" strokeWidth="1.5" filter="url(#soft3D)"/>
              <circle cx="145" cy="122" r="3.5" fill="rgba(255,255,200,0.8)"/>
              <circle cx="130" cy="130" r="4" fill="rgba(255,80,80,0.7)" filter="url(#heartGlow)"/>
            </>}

            {/* ===== WEEK 8-13 ===== */}
            {w>=8&&w<=13&&<>
              <ellipse cx="122" cy="148" rx="18" ry="26" fill="url(#skinG3D)" filter="url(#soft3D)"/>
              <circle cx="112" cy="112" r="24" fill="url(#headG3D)" filter="url(#soft3D)"/>
              <ellipse cx="98" cy="80" rx="10" ry="7" fill="rgba(255,255,255,0.45)" transform="rotate(-20,98,80)"/>
              <ellipse cx="105" cy="109" rx="3.5" ry="4" fill={eyeCol}/>
              <circle cx="106" cy="107" r="1.5" fill="white" opacity="0.9"/>
              <ellipse cx="119" cy="107" rx="3.5" ry="4" fill={eyeCol}/>
              <circle cx="120" cy="105" r="1.5" fill="white" opacity="0.9"/>
              <ellipse cx="112" cy="117" rx="2.5" ry="1.5" fill={skinS} opacity="0.6"/>
              <path d="M 108 122 Q 112 125 116 122" fill="none" stroke={skinS} strokeWidth="1.5" strokeLinecap="round"/>
              <ellipse cx="101" cy="114" rx="7" ry="4.5" fill={cheek}/>
              <ellipse cx="122" cy="112" rx="6" ry="4" fill={cheek}/>
              <ellipse cx="90" cy="111" rx="5" ry="7" fill={skin} stroke={skinD} strokeWidth="1.2"/>
              <path d="M 128 138 Q 152 128 155 142 Q 156 150 148 152" fill="none" stroke={skin} strokeWidth="9" strokeLinecap="round" filter="url(#soft3D)"/>
              <ellipse cx="148" cy="153" rx="7" ry="5" fill={skinD}/>
              <path d="M 114 170 Q 100 185 95 194 Q 91 200 87 194" fill="none" stroke={skin} strokeWidth="10" strokeLinecap="round" filter="url(#soft3D)"/>
              <path d="M 128 170 Q 140 183 142 193 Q 143 199 138 195" fill="none" stroke={skin} strokeWidth="9" strokeLinecap="round" filter="url(#soft3D)"/>
              <path d="M 122 148 Q 150 155 154 140" fill="none" stroke="rgba(180,100,60,0.55)" strokeWidth="3.5" strokeLinecap="round"/>
              <circle cx="120" cy="137" r="6" fill="rgba(255,80,80,0.35)" filter="url(#heartGlow)"/>
              <text x="120" y="140" fill="rgba(255,80,80,0.95)" fontSize="9" textAnchor="middle" fontWeight="bold">♥</text>
            </>}

            {/* ===== WEEK 14-21 ===== */}
            {w>=14&&w<=21&&<>
              <ellipse cx="125" cy="150" rx="24" ry="33" fill="url(#skinG3D)" filter="url(#soft3D)"/>
              <circle cx="107" cy="106" r="29" fill="url(#headG3D)" filter="url(#soft3D)"/>
              <ellipse cx="94" cy="84" rx="12" ry="8" fill="rgba(255,255,255,0.4)" transform="rotate(-15,94,84)"/>
              <path d="M 82 95 Q 93 77 109 80 Q 126 77 133 90" fill="none" stroke={hair} strokeWidth="4" strokeLinecap="round" opacity="0.75"/>
              <path d="M 84 88 Q 89 75 97 79" fill="none" stroke={hair} strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
              <ellipse cx="98" cy="103" rx="5.5" ry="6" fill={eyeCol}/>
              <circle cx="99.5" cy="101" r="2.2" fill="white" opacity="0.9"/>
              <path d="M 93 96 Q 99 93 105 96" fill="none" stroke={hair} strokeWidth="1.5" opacity="0.6"/>
              <path d="M 83 109 Q 80 115 83 119 Q 88 122 92 119" fill="none" stroke={skinS} strokeWidth="2" strokeLinecap="round"/>
              <path d="M 80 129 Q 88 135 98 129" fill={skinS} opacity="0.55"/>
              <ellipse cx="85" cy="116" rx="8.5" ry="5" fill={cheek}/>
              <ellipse cx="134" cy="101" rx="6" ry="10" fill={skin} stroke={skinD} strokeWidth="1.5"/>
              <path d="M 150 150 Q 174 136 177 154 Q 178 166 166 170" fill="none" stroke={skin} strokeWidth="11" strokeLinecap="round" filter="url(#soft3D)"/>
              <ellipse cx="166" cy="171" rx="9" ry="7" fill={skinD}/>
              <path d="M 103 153 Q 75 141 71 157 Q 69 170 80 174" fill="none" stroke={skin} strokeWidth="10" strokeLinecap="round" filter="url(#soft3D)"/>
              <path d="M 112 180 Q 96 198 90 210 Q 86 217 79 213" fill="none" stroke={skin} strokeWidth="12" strokeLinecap="round" filter="url(#soft3D)"/>
              <path d="M 136 179 Q 150 196 154 209 Q 157 216 163 212" fill="none" stroke={skin} strokeWidth="11" strokeLinecap="round" filter="url(#soft3D)"/>
              <path d="M 122 150 Q 160 158 163 140" fill="none" stroke="rgba(180,100,60,0.6)" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="120" cy="133" r="7" fill="rgba(255,80,80,0.28)" filter="url(#heartGlow)"/>
              <text x="120" y="137" fill="rgba(255,80,80,0.95)" fontSize="10" textAnchor="middle" fontWeight="bold">♥</text>
            </>}

            {/* ===== WEEK 22-29 ===== */}
            {w>=22&&w<=29&&<>
              <ellipse cx="128" cy="144" rx="28" ry="37" fill="url(#skinG3D)" filter="url(#soft3D)"/>
              <circle cx="107" cy="97" r="32" fill="url(#headG3D)" filter="url(#soft3D)"/>
              <ellipse cx="92" cy="76" rx="13" ry="9" fill="rgba(255,255,255,0.4)" transform="rotate(-15,92,76)"/>
              <path d="M 80 84 Q 93 63 109 67 Q 125 63 136 78" fill="none" stroke={hair} strokeWidth="5" strokeLinecap="round" opacity="0.75"/>
              <path d="M 82 76 Q 88 62 99 67" fill="none" stroke={hair} strokeWidth="3.5" strokeLinecap="round" opacity="0.6"/>
              <ellipse cx="96" cy="93" rx="6" ry="6.5" fill={eyeCol}/>
              <circle cx="97.5" cy="91" r="2.5" fill="white" opacity="0.92"/>
              <path d="M 90 85 Q 98 82 106 85" fill="none" stroke={hair} strokeWidth="2" strokeLinecap="round" opacity="0.65"/>
              <path d="M 80 105 Q 77 112 80 117 Q 86 120 90 117" fill="none" stroke={skinS} strokeWidth="2" strokeLinecap="round"/>
              <path d="M 78 127 Q 89 134 100 127" fill={skinS} opacity="0.5"/>
              <ellipse cx="73" cy="111" rx="9" ry="5.5" fill={cheek}/>
              <ellipse cx="117" cy="105" rx="7.5" ry="5" fill={cheek}/>
              <ellipse cx="137" cy="99" rx="7.5" ry="12" fill={skin} stroke={skinD} strokeWidth="1.5"/>
              <path d="M 148 125 Q 178 111 180 131 Q 181 145 169 149" fill="none" stroke={skin} strokeWidth="12" strokeLinecap="round" filter="url(#soft3D)"/>
              <ellipse cx="169" cy="150" rx="10" ry="8" fill={skinD}/>
              <path d="M 106 131 Q 75 119 71 135 Q 69 150 80 154" fill="none" stroke={skin} strokeWidth="11" strokeLinecap="round" filter="url(#soft3D)"/>
              <path d="M 112 178 Q 92 198 86 212 Q 82 220 75 215" fill="none" stroke={skin} strokeWidth="13" strokeLinecap="round" filter="url(#soft3D)"/>
              <ellipse cx="74" cy="215" rx="11" ry="8" fill={skinD}/>
              <path d="M 143 176 Q 160 196 165 210 Q 168 218 175 213" fill="none" stroke={skin} strokeWidth="12" strokeLinecap="round" filter="url(#soft3D)"/>
              <ellipse cx="175" cy="213" rx="10" ry="7.5" fill={skinD}/>
              <path d="M 128 144 Q 167 152 170 132" fill="none" stroke="rgba(180,100,60,0.65)" strokeWidth="4.5" strokeLinecap="round"/>
              <circle cx="126" cy="128" r="8.5" fill="rgba(255,80,80,0.25)" filter="url(#heartGlow)"/>
              <text x="126" y="132" fill="rgba(255,80,80,0.95)" fontSize="12" textAnchor="middle" fontWeight="bold">♥</text>
            </>}

            {/* ===== WEEK 30-40 ===== */}
            {w>=30&&<>
              <circle cx="130" cy="176" r="34" fill="url(#headG3D)" filter="url(#soft3D)"/>
              <ellipse cx="115" cy="156" rx="12" ry="9" fill="rgba(255,255,255,0.4)" transform="rotate(20,115,156)"/>
              <path d="M 102 186 Q 114 205 130 206 Q 146 205 158 186" fill="none" stroke={hair} strokeWidth="5.5" strokeLinecap="round" opacity="0.7"/>
              <ellipse cx="119" cy="168" rx="6.5" ry="7" fill={eyeCol}/>
              <circle cx="120.5" cy="166" r="2.5" fill="white" opacity="0.92"/>
              <ellipse cx="141" cy="168" rx="6.5" ry="7" fill={eyeCol}/>
              <circle cx="142.5" cy="166" r="2.5" fill="white" opacity="0.92"/>
              <path d="M 114 159 Q 122 156 128 159" fill="none" stroke={hair} strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
              <path d="M 133 159 Q 141 156 148 159" fill="none" stroke={hair} strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
              <ellipse cx="130" cy="177" rx="3.5" ry="2.5" fill={skinS} opacity="0.45"/>
              <path d="M 122 185 Q 130 189 138 185" fill={skinS} opacity="0.5"/>
              <ellipse cx="111" cy="175" rx="9.5" ry="6" fill={cheek}/>
              <ellipse cx="149" cy="175" rx="9.5" ry="6" fill={cheek}/>
              <ellipse cx="130" cy="114" rx="30" ry="40" fill="url(#skinG3D)" filter="url(#soft3D)"/>
              <circle cx="130" cy="104" r="9" fill="rgba(255,80,80,0.25)" filter="url(#heartGlow)"/>
              <text x="130" y="108" fill="rgba(255,80,80,0.95)" fontSize="13" textAnchor="middle" fontWeight="bold">♥</text>
              <path d="M 100 110 Q 72 100 68 117 Q 66 130 78 134" fill="none" stroke={skin} strokeWidth="13" strokeLinecap="round" filter="url(#soft3D)"/>
              <ellipse cx="78" cy="135" rx="10" ry="8" fill={skinD}/>
              <path d="M 160 110 Q 188 100 190 117 Q 192 130 180 134" fill="none" stroke={skin} strokeWidth="13" strokeLinecap="round" filter="url(#soft3D)"/>
              <ellipse cx="180" cy="135" rx="10" ry="8" fill={skinD}/>
              <path d="M 110 76 Q 88 54 80 38 Q 75 28 84 27" fill="none" stroke={skin} strokeWidth="14" strokeLinecap="round" filter="url(#soft3D)"/>
              <ellipse cx="84" cy="27" rx="11" ry="9" fill={skinD}/>
              {[0,1,2,3,4].map(i=>(<circle key={i} cx={76+i*5} cy={20} r="3" fill={skin} stroke={skinD} strokeWidth="0.8"/>))}
              <path d="M 150 76 Q 172 54 180 38 Q 185 28 176 27" fill="none" stroke={skin} strokeWidth="14" strokeLinecap="round" filter="url(#soft3D)"/>
              <ellipse cx="176" cy="27" rx="11" ry="9" fill={skinD}/>
              {[0,1,2,3,4].map(i=>(<circle key={i} cx={168+i*5} cy={20} r="3" fill={skin} stroke={skinD} strokeWidth="0.8"/>))}
              <path d="M 130 116 Q 164 110 168 94" fill="none" stroke="rgba(180,100,60,0.6)" strokeWidth="4.5" strokeLinecap="round"/>
              <ellipse cx="194" cy="84" rx="23" ry="16" fill="rgba(180,80,80,0.2)" stroke="rgba(180,80,80,0.35)" strokeWidth="1.5"/>
            </>}

            {/* Sparkles */}
            {[{x:55,y:58},{x:205,y:68},{x:44,y:185},{x:212,y:192}].map((p,i)=>(
              <circle key={i} cx={p.x} cy={p.y} r="2" fill="rgba(255,255,255,0.7)"/>
            ))}
          </svg>

          <div style={{display:"inline-block",marginTop:4,padding:"7px 20px",borderRadius:20,background:"rgba(255,255,255,0.75)",color:"#5a3060",fontSize:12,fontWeight:700,backdropFilter:"blur(4px)"}}>
            {label}
          </div>
          <div style={{marginTop:10,padding:"6px 16px",background:"rgba(255,255,255,0.5)",borderRadius:12}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#888",marginBottom:4}}>
              <span>Week 4</span><span style={{color:"#ff6b35",fontWeight:700}}>{sizeLabel}</span><span>Week 40</span>
            </div>
            <div style={{background:"rgba(0,0,0,0.08)",borderRadius:99,height:6,overflow:"hidden"}}>
              <div style={{width:`${((w-4)/36)*100}%`,height:"100%",background:"linear-gradient(90deg,#ff6b35,#6a0572)",borderRadius:99}}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function calcPregnancy() {
    if(!lmpDate) return;
    const lmp=new Date(lmpDate), today=new Date();
    const diff=Math.floor((today-lmp)/(1000*60*60*24));
    const weeks=Math.floor(diff/7), days=diff%7;
    const due=new Date(lmp); due.setDate(due.getDate()+280);
    const daysLeft=Math.floor((due-today)/(1000*60*60*24));
    // Trimester start dates
    const t2start=new Date(lmp); t2start.setDate(t2start.getDate()+7*13);
    const t3start=new Date(lmp); t3start.setDate(t3start.getDate()+7*27);
    // Current test recommendation
    const currentTest = PREGNANCY_TESTS.find(t=>{
      const [s,e]=t.weeks.split("-").map(Number);
      return weeks>=s && weeks<=e;
    }) || PREGNANCY_TESTS[PREGNANCY_TESTS.length-1];
    const zodiac=getZodiac(due);
    setViewWeek(weeks);
    setResult({weeks,days,due,daysLeft,totalDays:diff,progress:Math.min((weeks/40)*100,100),info:getWeekInfo(weeks),tri:getTrimester(weeks),t2start,t3start,currentTest,zodiac});
  }

  async function callAI(prompt, maxTokens=2500) {
    const res = await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:maxTokens,
        messages:[{role:"user",content:prompt}] })
    });
    const data = await res.json();
    let text = data.content[0].text;
    // Remove markdown code blocks
    text = text.replace(/```json\s*/g,"").replace(/```\s*/g,"").trim();
    // Extract JSON array if wrapped in extra text
    const match = text.match(/\[[\s\S]*\]/);
    if(match) text = match[0];
    try {
      const parsed = JSON.parse(text);
      // Sanitize each item — ensure required fields exist
      return parsed.map(item => ({
        name: item.name || "Unknown",
        meaning: item.meaning || "Beautiful name",
        nativeMeaning: item.nativeMeaning || "",
        origin: item.origin || "Indian",
        popularity: item.popularity || 70,
        connection: item.connection || "",
      }));
    } catch(e) {
      console.error("JSON parse error:", e, text.slice(0,200));
      throw e;
    }
  }

  async function fetchRegionalNames() {
    if(!selLang) return;
    setRegLoading(true); setRegNames([]);
    const lang = INDIAN_LANGUAGES.find(l=>l.code===selLang);
    const letterStr = regLetter==="All" ? "any letter" : `starting with ${regLetter}`;
    try {
      const names = await callAI(
        `${lang.instruction}
Generate exactly 20 beautiful ${regGender==="boy"?"boy":"girl"} baby names ${letterStr}.
These names should be authentic, traditional and meaningful for ${lang.name} speaking families.
IMPORTANT: Every item MUST have all these fields filled:
- name: the baby name in Roman/English letters (transliterated)
- meaning: meaning in English
- nativeMeaning: meaning or name written in native script (${lang.name})
- origin: "${lang.name}"
- popularity: number between 40-95
Return ONLY a valid JSON array of exactly 20 objects. No extra text, no markdown.`, 3000);
      setRegNames(names);
    } catch(e){
      setRegNames([{name:"Error",meaning:"Dobara try karo — AI response mein kuch gadbad hui",nativeMeaning:"",origin:"",popularity:0}]);
    }
    setRegLoading(false);
  }

  async function fetchExploreNames() {
    setExpLoading(true); setExpNames([]);
    const letterStr = expLetter==="All"?"any letter":`starting with ${expLetter}`;
    try {
      const names = await callAI(
        `Generate exactly 20 beautiful ${expGender==="boy"?"boy":"girl"} baby names ${letterStr} from any Indian culture/language.
Mix names from Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, etc.
Return ONLY JSON: [{"name":"...","meaning":"...","origin":"...","popularity":75}]
No markdown.`);
      setExpNames(names);
    } catch(e){ setExpNames([]); }
    setExpLoading(false);
  }

  async function fetchCoupleNames() {
    if(!husband.trim()||!wife.trim()) return;
    setCoupleLoading(true); setCoupleNames([]);
    try {
      const names = await callAI(
        `Couple: Husband=${husband}, Wife=${wife}. They want a ${coupleGender==="boy"?"son":"daughter"} name.
Generate exactly 20 baby names connected to both parent names (shared sounds, letters, meaning links).
Return ONLY JSON: [{"name":"...","meaning":"...","origin":"...","connection":"why this connects to ${husband} & ${wife}"}]
No markdown.`, 3000);
      setCoupleNames(names);
    } catch(e){ setCoupleNames([]); }
    setCoupleLoading(false);
  }

  async function fetchAINames() {
    if(!aiPrompt.trim()) return;
    setAiLoading(true); setAiNames([]);
    try {
      const names = await callAI(
        `Generate exactly 20 baby names for a ${aiGender==="boy"?"boy":"girl"}. Requirements: ${aiPrompt}.
Return ONLY JSON: [{"name":"...","meaning":"...","origin":"...","popularity":75}]
No markdown.`);
      setAiNames(names);
    } catch(e){ setAiNames([]); }
    setAiLoading(false);
  }

  function toggleSave(name) { setSaved(p=>p.includes(name)?p.filter(n=>n!==name):[...p,name]); }

  function NameTile({n}) {
    const num=getNumerology(n.name), ni=NUM_INFO[num]||NUM_INFO[1], pop=n.popularity||getPopularity(n.name), isSaved=saved.includes(n.name);
    return (
      <div onClick={()=>setDetail(n)} style={{background:isSaved?"linear-gradient(135deg,#fff3e0,#f3e0f7)":"white",border:isSaved?"2px solid #ff6b35":"2px solid #ffe8d6",borderRadius:14,padding:"12px 14px",marginBottom:10,cursor:"pointer"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{fontSize:17,fontWeight:800,color:"#2d1b4e"}}>{n.name} {isSaved?"❤️":""}</div>
            <div style={{fontSize:11,color:"#888",marginTop:2}}>{n.meaning}</div>
            {n.nativeMeaning && <div style={{fontSize:12,color:"#6a0572",marginTop:2,fontWeight:600}}>{n.nativeMeaning}</div>}
            <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
              <span style={{background:ni.color+"20",color:ni.color,padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700}}>⭐ {num} · {ni.label}</span>
              <span style={{background:"#e8f5e9",color:"#4caf50",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700}}>📊 {pop}%</span>
              <span style={{background:"#f3e0f7",color:"#6a0572",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700}}>🌍 {n.origin}</span>
            </div>
            {n.connection && <div style={{fontSize:10,color:"#ff6b35",marginTop:5,background:"#fff3e0",padding:"4px 8px",borderRadius:8}}>🔗 {n.connection}</div>}
          </div>
          <div style={{fontSize:11,color:"#ccc",marginLeft:8}}>→</div>
        </div>
      </div>
    );
  }

  function DetailModal({n,onClose}) {
    const num=getNumerology(n.name), ni=NUM_INFO[num]||NUM_INFO[1], pop=n.popularity||getPopularity(n.name), isSaved=saved.includes(n.name);
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",alignItems:"flex-end"}} onClick={onClose}>
        <div onClick={e=>e.stopPropagation()} style={{background:"white",borderRadius:"24px 24px 0 0",padding:24,width:"100%",maxHeight:"85vh",overflowY:"auto",boxSizing:"border-box"}}>
          <div style={{width:40,height:4,background:"#eee",borderRadius:99,margin:"0 auto 18px"}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div>
              <div style={{fontSize:30,fontWeight:900,color:"#2d1b4e"}}>{n.name}</div>
              {n.nativeMeaning && <div style={{fontSize:16,color:"#6a0572",marginTop:2}}>{n.nativeMeaning}</div>}
              <div style={{fontSize:13,color:"#999",marginTop:2}}>🌍 {n.origin}</div>
            </div>
            <button onClick={()=>toggleSave(n.name)} style={{background:isSaved?"#fff3e0":"#f5f5f5",border:"none",borderRadius:50,width:44,height:44,fontSize:20,cursor:"pointer"}}>{isSaved?"❤️":"🤍"}</button>
          </div>
          <div style={{background:"#fdf4ff",borderRadius:14,padding:14,marginBottom:12}}>
            <div style={{fontSize:11,color:"#6a0572",fontWeight:700,marginBottom:4}}>📖 MEANING</div>
            <div style={{fontSize:15,color:"#333",fontWeight:600}}>{n.meaning}</div>
          </div>
          <div style={{background:ni.color+"18",borderRadius:14,padding:14,marginBottom:12,border:`2px solid ${ni.color}30`}}>
            <div style={{fontSize:11,color:ni.color,fontWeight:700,marginBottom:8}}>⭐ NUMEROLOGY</div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:48,height:48,borderRadius:14,background:ni.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:900,color:"white"}}>{num}</div>
              <div><div style={{fontSize:16,fontWeight:800,color:"#333"}}>{ni.label}</div><div style={{fontSize:12,color:"#777"}}>{ni.desc}</div></div>
            </div>
          </div>
          <div style={{background:"#f0fff4",borderRadius:14,padding:14,marginBottom:16,border:"2px solid #b2dfdb"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <div style={{fontSize:11,color:"#4caf50",fontWeight:700}}>📊 POPULARITY</div>
              <div style={{fontSize:13,fontWeight:800,color:"#4caf50"}}>{pop}%</div>
            </div>
            <div style={{background:"#e0f2f1",borderRadius:99,height:10,overflow:"hidden"}}>
              <div style={{width:`${pop}%`,height:"100%",background:"linear-gradient(90deg,#4caf50,#81c784)",borderRadius:99}}/>
            </div>
            <div style={{fontSize:11,color:"#999",marginTop:6}}>{pop>=70?"🔥 Bahut popular naam":pop>=40?"✨ Moderately popular":"💎 Rare & unique naam"}</div>
          </div>
          {n.connection && <div style={{background:"#fff3e0",borderRadius:14,padding:14,marginBottom:16}}><div style={{fontSize:11,color:"#ff6b35",fontWeight:700,marginBottom:4}}>💑 COUPLE CONNECTION</div><div style={{fontSize:13,color:"#555"}}>{n.connection}</div></div>}
          <button onClick={()=>{toggleSave(n.name);onClose();}} style={{width:"100%",padding:14,background:isSaved?"#f5f5f5":"linear-gradient(135deg,#ff6b35,#6a0572)",color:isSaved?"#999":"white",border:"none",borderRadius:14,fontSize:15,fontWeight:800,cursor:"pointer"}}>{isSaved?"❌ Remove from Saved":"❤️ Save this Name"}</button>
        </div>
      </div>
    );
  }

  const subTabs = [
    {key:"regional",icon:"🗺️",label:"10 Language"},
    {key:"explore", icon:"🔍",label:"Explore"},
    {key:"couple",  icon:"💑",label:"Couple"},
    {key:"custom",  icon:"🤖",label:"AI Custom"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#fff3e0 0%,#f3e0f7 50%,#e8eaf6 100%)",fontFamily:"'Segoe UI',sans-serif"}}>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#ff6b35,#6a0572)",padding:"20px 20px 16px",textAlign:"center",boxShadow:"0 4px 20px rgba(255,107,53,0.3)"}}>
        <div style={{fontSize:30}}>🤱</div>
        <h1 style={{color:"white",margin:"6px 0 2px",fontSize:22,fontWeight:800}}>Naujivan 🌱</h1>
        <p style={{color:"rgba(255,255,255,0.85)",margin:0,fontSize:12}}>Har naye janam ki kahani — 10 Indian Languages</p>
      </div>

      {/* Main Tabs */}
      <div style={{display:"flex",margin:"12px 14px 0",background:"white",borderRadius:14,padding:4,boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
        {[["pregnancy","🤰 Pregnancy"],["names","👶 Baby Names"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"10px 0",border:"none",borderRadius:11,cursor:"pointer",fontSize:13,fontWeight:700,
            background:tab===k?"linear-gradient(135deg,#ff6b35,#6a0572)":"transparent",color:tab===k?"white":"#888"}}>{l}</button>
        ))}
      </div>

      <div style={{padding:14}}>

        {/* ===== PREGNANCY TAB ===== */}
        {tab==="pregnancy" && (
          <div>
            <div style={{background:"white",borderRadius:16,padding:18,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
              <h2 style={{margin:"0 0 4px",fontSize:15,color:"#333"}}>📅 Last Period Date (LMP)</h2>
              <p style={{margin:"0 0 12px",fontSize:12,color:"#999"}}>Pichli period ka pehla din daalo</p>
              <input type="date" value={lmpDate} onChange={e=>setLmpDate(e.target.value)} max={new Date().toISOString().split("T")[0]}
                style={{width:"100%",padding:"12px 14px",border:"2px solid #ffe8d6",borderRadius:12,fontSize:15,boxSizing:"border-box",outline:"none",color:"#333"}}/>
              <button onClick={calcPregnancy} style={{width:"100%",marginTop:12,padding:13,background:"linear-gradient(135deg,#ff6b35,#6a0572)",color:"white",border:"none",borderRadius:12,fontSize:15,fontWeight:700,cursor:"pointer"}}>Calculate 🌸</button>
            </div>
            {result && (
              <>
                {/* Main Result Card */}
                <div style={{background:"linear-gradient(135deg,#ff6b35,#6a0572)",borderRadius:16,padding:20,marginBottom:14,color:"white",textAlign:"center"}}>
                  <div style={{fontSize:13,opacity:0.85}}>{result.tri.emoji} {result.tri.name}</div>
                  <div style={{fontSize:56,fontWeight:900,lineHeight:1.1}}>{result.weeks}</div>
                  <div style={{fontSize:16,opacity:0.9}}>weeks {result.days>0?`+ ${result.days} days`:""}</div>
                  <div style={{marginTop:8,fontSize:13,opacity:0.85}}>{result.daysLeft>0?`${result.daysLeft} days to go! 💕`:"Due date passed! 🎉"}</div>
                </div>

                {/* Progress Bar */}
                <div style={{background:"white",borderRadius:16,padding:18,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:12,color:"#888"}}><span>Week 1</span><span style={{fontWeight:700,color:"#ff6b35"}}>{Math.round(result.progress)}%</span><span>Week 40</span></div>
                  <div style={{background:"#ffe8d6",borderRadius:99,height:14,overflow:"hidden"}}><div style={{width:`${result.progress}%`,height:"100%",background:"linear-gradient(90deg,#ff6b35,#6a0572)",borderRadius:99}}/></div>
                  {/* Trimester markers */}
                  <div style={{display:"flex",gap:8,marginTop:12}}>
                    {[{n:"1st",w:"1-12"},{n:"2nd",w:"13-26"},{n:"3rd",w:"27-40"}].map((t,i)=>{
                      const active=i===(result.weeks<=12?0:result.weeks<=26?1:2);
                      return <div key={t.n} style={{flex:1,textAlign:"center",padding:"8px 4px",borderRadius:10,background:active?"#fff3e0":"#f9f9f9",border:active?"2px solid #ff6b35":"2px solid transparent"}}>
                        <div style={{fontSize:11,fontWeight:800,color:active?"#ff6b35":"#aaa"}}>{t.n}</div>
                        <div style={{fontSize:9,color:"#bbb"}}>Week {t.w}</div>
                      </div>;
                    })}
                  </div>
                </div>

                {/* Stats Grid */}
                <div style={{marginBottom:14}}>
                  {/* Due Date — big prominent card */}
                  <div style={{background:"linear-gradient(135deg,#ff6b35,#6a0572)",borderRadius:16,padding:"16px 20px",marginBottom:10,textAlign:"center",boxShadow:"0 4px 20px rgba(255,107,53,0.3)"}}>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",marginBottom:4}}>📅 Expected Due Date</div>
                    <div style={{fontSize:28,fontWeight:900,color:"white",letterSpacing:0.5}}>
                      {result.due.toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}
                    </div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.75)",marginTop:4}}>
                      {result.daysLeft>0?`${result.daysLeft} din baaki hain 💕`:"Due date aa gayi! 🎉"}
                    </div>
                  </div>
                  {/* 3 smaller stats */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                    {[
                      {icon:"🗓️",label:"Total Days",val:`${result.totalDays} din`,bg:"#f3e0f7",col:"#6a0572"},
                      {icon:"⏳",label:"Bache Din",val:`${Math.max(0,result.daysLeft)} din`,bg:"#e8f5e9",col:"#2e7d32"},
                      {icon:"⚖️",label:"Baby Wajan",val:result.info.weight||"~",bg:"#fff8e1",col:"#f0a500"},
                    ].map(s=>(
                      <div key={s.label} style={{background:s.bg,borderRadius:14,padding:"12px 8px",textAlign:"center"}}>
                        <div style={{fontSize:20}}>{s.icon}</div>
                        <div style={{fontSize:10,color:"#999",marginTop:3}}>{s.label}</div>
                        <div style={{fontSize:13,fontWeight:800,color:s.col,marginTop:2}}>{s.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trimester Dates */}
                <div style={{background:"white",borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
                  <h3 style={{margin:"0 0 12px",fontSize:15,color:"#333"}}>📆 Trimester Dates</h3>
                  {[
                    {emoji:"🌸",name:"1st Trimester",range:"Week 1–12",date:"Pregnancy shuru se",active:result.weeks<=12},
                    {emoji:"🌷",name:"2nd Trimester",range:"Week 13–26",date:result.t2start.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}),active:result.weeks>12&&result.weeks<=26},
                    {emoji:"🌺",name:"3rd Trimester",range:"Week 27–40",date:result.t3start.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}),active:result.weeks>26},
                  ].map(t=>(
                    <div key={t.name} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:12,marginBottom:8,background:t.active?"linear-gradient(135deg,#fff3e0,#f3e0f7)":"#f9f9f9",border:t.active?"2px solid #ff6b35":"2px solid transparent"}}>
                      <div style={{fontSize:24}}>{t.emoji}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:700,color:t.active?"#ff6b35":"#666"}}>{t.name} {t.active?"← Aap yahan hain":""}</div>
                        <div style={{fontSize:11,color:"#999"}}>{t.range}</div>
                      </div>
                      <div style={{fontSize:11,color:"#999",textAlign:"right"}}>{t.date}</div>
                    </div>
                  ))}
                </div>

                {/* Baby This Week — with Prev/Next + Fetus */}
                {viewWeek!==null && (()=>{
                  const displayWeek=viewWeek;
                  const displayInfo=getWeekInfo(displayWeek);
                  const displayTri=getTrimester(displayWeek);
                  return (
                  <div style={{background:"white",borderRadius:16,padding:18,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
                    {/* Header with Prev/Next */}
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                      <button onClick={()=>setViewWeek(Math.max(4,displayWeek-1))} disabled={displayWeek<=4}
                        style={{padding:"8px 14px",border:"none",borderRadius:10,background:displayWeek<=4?"#f5f5f5":"linear-gradient(135deg,#ff6b35,#6a0572)",color:displayWeek<=4?"#ccc":"white",fontWeight:800,fontSize:13,cursor:displayWeek<=4?"not-allowed":"pointer"}}>
                        ← Prev
                      </button>
                      <div style={{textAlign:"center"}}>
                        <div style={{fontSize:18,fontWeight:900,color:"#2d1b4e"}}>Week {displayWeek}</div>
                        <div style={{fontSize:11,color:"#999"}}>{displayTri.emoji} {displayTri.name}</div>
                      </div>
                      <button onClick={()=>setViewWeek(Math.min(40,displayWeek+1))} disabled={displayWeek>=40}
                        style={{padding:"8px 14px",border:"none",borderRadius:10,background:displayWeek>=40?"#f5f5f5":"linear-gradient(135deg,#ff6b35,#6a0572)",color:displayWeek>=40?"#ccc":"white",fontWeight:800,fontSize:13,cursor:displayWeek>=40?"not-allowed":"pointer"}}>
                        Next →
                      </button>
                    </div>

                    {/* Fetus Illustration */}
                    <FetusIllustration week={displayWeek}/>

                    {/* Stats 3 cards */}
                    <div style={{display:"flex",gap:8,marginBottom:12}}>
                      <div style={{flex:1,background:"#fff3e0",borderRadius:12,padding:10,textAlign:"center"}}>
                        <div style={{fontSize:22}}>{displayInfo.emoji||"🌱"}</div>
                        <div style={{fontSize:10,color:"#ff6b35",fontWeight:700,marginTop:3}}>Aakaar</div>
                        <div style={{fontSize:11,color:"#666"}}>{displayInfo.size.split(" ")[0]}</div>
                      </div>
                      <div style={{flex:1,background:"#f3e0f7",borderRadius:12,padding:10,textAlign:"center"}}>
                        <div style={{fontSize:22}}>📏</div>
                        <div style={{fontSize:10,color:"#6a0572",fontWeight:700,marginTop:3}}>Lambai</div>
                        <div style={{fontSize:11,color:"#666"}}>{displayInfo.length||"~"}</div>
                      </div>
                      <div style={{flex:1,background:"#e8f5e9",borderRadius:12,padding:10,textAlign:"center"}}>
                        <div style={{fontSize:22}}>⚖️</div>
                        <div style={{fontSize:10,color:"#2e7d32",fontWeight:700,marginTop:3}}>Wajan</div>
                        <div style={{fontSize:11,color:"#666"}}>{displayInfo.weight||"~"}</div>
                      </div>
                    </div>

                    <div style={{background:"#fdf4ff",borderRadius:12,padding:12,marginBottom:10}}>
                      <div style={{fontSize:11,color:"#6a0572",fontWeight:700,marginBottom:4}}>🧠 Vikas (Development)</div>
                      <div style={{fontSize:13,color:"#555",lineHeight:1.5}}>{displayInfo.dev}</div>
                    </div>
                    <div style={{background:"#fff8e1",borderRadius:12,padding:12}}>
                      <div style={{fontSize:11,color:"#f0a500",fontWeight:700,marginBottom:4}}>💡 Aapke Liye Tip</div>
                      <div style={{fontSize:13,color:"#555",lineHeight:1.5}}>{displayInfo.tip}</div>
                    </div>

                    {/* Back to current week button */}
                    {displayWeek!==result.weeks && (
                      <button onClick={()=>setViewWeek(result.weeks)} style={{width:"100%",marginTop:12,padding:"10px",border:"2px solid #ff6b35",borderRadius:12,background:"transparent",color:"#ff6b35",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                        🔙 Apne Week {result.weeks} pe Wapas Jao
                      </button>
                    )}
                  </div>
                  );
                })()}

                {/* Astrology / Rashifal */}
                {result.zodiac && (
                  <div style={{background:"linear-gradient(135deg,#1a0533,#2d0a4e)",borderRadius:16,padding:18,marginBottom:14,color:"white"}}>
                    <div style={{fontSize:14,fontWeight:800,marginBottom:12,color:"rgba(255,200,150,0.9)"}}>🔮 Baby ka Rashifal</div>
                    <div style={{display:"flex",alignItems:"center",gap:16}}>
                      <div style={{width:64,height:64,borderRadius:99,background:"rgba(255,150,80,0.2)",border:"2px solid rgba(255,150,80,0.5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,flexShrink:0}}>
                        {result.zodiac.symbol}
                      </div>
                      <div>
                        <div style={{fontSize:20,fontWeight:900}}>{result.zodiac.hindi}</div>
                        <div style={{fontSize:13,opacity:0.8}}>{result.zodiac.sign}</div>
                        <div style={{fontSize:11,opacity:0.6,marginTop:4}}>Due Date: {result.due.toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Current Tests */}
                {result.currentTest && (
                  <div style={{background:"white",borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)",border:"2px solid #ff6b35"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                      <span style={{fontSize:24}}>{result.currentTest.icon}</span>
                      <div>
                        <div style={{fontSize:14,fontWeight:800,color:"#ff6b35"}}>⚠️ Abhi Karwayein</div>
                        <div style={{fontSize:12,color:"#999"}}>Week {result.currentTest.weeks} — {result.currentTest.title}</div>
                      </div>
                    </div>
                    {result.currentTest.tests.map((t,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:i<result.currentTest.tests.length-1?"1px solid #f5f5f5":"none"}}>
                        <div style={{width:8,height:8,borderRadius:99,background:"#ff6b35",flexShrink:0}}/>
                        <div style={{fontSize:13,color:"#444"}}>{t}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* All Tests Timeline */}
                <div style={{background:"white",borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
                  <h3 style={{margin:"0 0 14px",fontSize:15,color:"#333"}}>🗒️ Poori Pregnancy Test Guide</h3>
                  {PREGNANCY_TESTS.map((t,i)=>{
                    const [s,e]=t.weeks.split("-").map(Number);
                    const done=result.weeks>e;
                    const current=result.weeks>=s&&result.weeks<=e;
                    return (
                      <div key={i} style={{display:"flex",gap:12,marginBottom:12}}>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                          <div style={{width:32,height:32,borderRadius:99,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,
                            background:done?"#e8f5e9":current?"#ff6b35":"#f5f5f5",color:done?"#2e7d32":current?"white":"#bbb",flexShrink:0}}>
                            {done?"✓":t.icon}
                          </div>
                          {i<PREGNANCY_TESTS.length-1&&<div style={{width:2,flex:1,background:done?"#c8e6c9":"#f0f0f0",marginTop:4,minHeight:16}}/>}
                        </div>
                        <div style={{flex:1,paddingBottom:12}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div style={{fontSize:13,fontWeight:700,color:current?"#ff6b35":done?"#2e7d32":"#555"}}>{t.title}</div>
                            <span style={{fontSize:10,padding:"2px 8px",borderRadius:20,background:done?"#e8f5e9":current?"#fff3e0":"#f5f5f5",color:done?"#2e7d32":current?"#ff6b35":"#999",fontWeight:700}}>
                              {done?"Done ✓":current?"Now ⚡":`Wk ${t.weeks}`}
                            </span>
                          </div>
                          <div style={{fontSize:11,color:"#bbb",marginBottom:4}}>Week {t.weeks}</div>
                          {current&&t.tests.map((tt,j)=>(
                            <div key={j} style={{fontSize:11,color:"#666",padding:"3px 0"}}>• {tt}</div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* ===== NAMES TAB ===== */}
        {tab==="names" && (
          <div>
            {/* Sub-tabs */}
            <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
              {subTabs.map(t=>(
                <button key={t.key} onClick={()=>setNamesTab(t.key)} style={{
                  flexShrink:0,padding:"8px 14px",border:"none",borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:700,
                  background:namesTab===t.key?"linear-gradient(135deg,#ff6b35,#6a0572)":"white",
                  color:namesTab===t.key?"white":"#888",boxShadow:"0 2px 8px rgba(0,0,0,0.08)"
                }}>{t.icon} {t.label}</button>
              ))}
            </div>

            {/* ── 10 BHASHA TAB ── */}
            {namesTab==="regional" && (
              <div>
                <div style={{background:"linear-gradient(135deg,#ff6b35,#6a0572)",borderRadius:16,padding:16,marginBottom:14,color:"white"}}>
                  <div style={{fontSize:18,fontWeight:800,marginBottom:4}}>🗺️ 10 Indian Languages</div>
                  <div style={{fontSize:12,opacity:0.9}}>Apni bhasha mein baby ka naam dhundo — AI native script mein meaning dega!</div>
                </div>

                {/* Language Grid */}
                <div style={{background:"white",borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
                  <div style={{fontSize:12,color:"#6a0572",fontWeight:700,marginBottom:12}}>🌍 Apni Bhasha Chuniye</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    {INDIAN_LANGUAGES.map(lang=>(
                      <button key={lang.code} onClick={()=>setSelLang(lang.code)} style={{
                        padding:"12px 10px",border:"none",borderRadius:14,cursor:"pointer",textAlign:"left",
                        background:selLang===lang.code?"linear-gradient(135deg,#fff3e0,#f3e0f7)":"#f9f9f9",
                        outline:selLang===lang.code?"2px solid #ff6b35":"none",
                        transition:"all 0.2s"
                      }}>
                        <div style={{fontSize:18,marginBottom:3}}>{lang.flag}</div>
                        <div style={{fontSize:16,fontWeight:800,color:"#2d1b4e"}}>{lang.name}</div>
                        <div style={{fontSize:11,fontWeight:600,color:"#ff6b35",marginTop:2}}>{lang.englishName}</div>
                        <div style={{fontSize:10,color:"#bbb",marginTop:1}}>{lang.region}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {selLang && (
                  <div style={{background:"white",borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
                    <div style={{fontSize:13,color:"#333",fontWeight:700,marginBottom:12}}>
                      {INDIAN_LANGUAGES.find(l=>l.code===selLang)?.flag} {INDIAN_LANGUAGES.find(l=>l.code===selLang)?.name} Names ke liye filters:
                    </div>
                    {/* Gender */}
                    <div style={{display:"flex",gap:8,marginBottom:12}}>
                      {["boy","girl"].map(g=>(
                        <button key={g} onClick={()=>setRegGender(g)} style={{flex:1,padding:9,border:"none",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:700,
                          background:regGender===g?(g==="boy"?"linear-gradient(135deg,#ffb347,#6a0572)":"linear-gradient(135deg,#ffb347,#ff6b35)"):"#f5f5f5",
                          color:regGender===g?"white":"#aaa"}}>{g==="boy"?"👦 Ladka":"👧 Ladki"}</button>
                      ))}
                    </div>
                    {/* A-Z */}
                    <div style={{marginBottom:12}}>
                      <div style={{fontSize:11,color:"#6a0572",fontWeight:700,marginBottom:6}}>🔤 Letter Filter</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                        {ALPHABET.map(l=>(
                          <button key={l} onClick={()=>setRegLetter(l)} style={{padding:"4px 8px",border:"none",borderRadius:8,cursor:"pointer",fontSize:11,fontWeight:700,minWidth:28,
                            background:regLetter===l?"linear-gradient(135deg,#ff6b35,#6a0572)":"#f5f5f5",
                            color:regLetter===l?"white":"#888"}}>{l}</button>
                        ))}
                      </div>
                    </div>
                    <button onClick={fetchRegionalNames} disabled={regLoading} style={{width:"100%",padding:13,border:"none",borderRadius:12,fontSize:14,fontWeight:800,cursor:regLoading?"not-allowed":"pointer",
                      background:regLoading?"#eee":"linear-gradient(135deg,#ff6b35,#6a0572)",color:regLoading?"#bbb":"white"}}>
                      {regLoading?`🔍 ${INDIAN_LANGUAGES.find(l=>l.code===selLang)?.name} names dhundh raha hai...`:`🔍 20 ${INDIAN_LANGUAGES.find(l=>l.code===selLang)?.name} Names Dhundo`}
                    </button>
                  </div>
                )}

                {regNames.length>0 && (
                  <div style={{background:"white",borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                      <h3 style={{margin:0,fontSize:15,color:"#333"}}>✨ {regNames.length} Names Mile</h3>
                      {saved.length>0 && <span style={{background:"#fff3e0",color:"#ff6b35",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>❤️ {saved.length}</span>}
                    </div>
                    {regNames.map((n,i)=><NameTile key={i} n={n}/>)}
                  </div>
                )}
              </div>
            )}

            {/* ── EXPLORE TAB ── */}
            {namesTab==="explore" && (
              <div>
                <div style={{background:"white",borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
                  <h3 style={{margin:"0 0 12px",fontSize:15,color:"#333"}}>🔍 Mix Indian Names Explore Karo</h3>
                  <div style={{display:"flex",gap:8,marginBottom:12}}>
                    {["boy","girl"].map(g=>(
                      <button key={g} onClick={()=>setExpGender(g)} style={{flex:1,padding:9,border:"none",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:700,
                        background:expGender===g?(g==="boy"?"linear-gradient(135deg,#ffb347,#6a0572)":"linear-gradient(135deg,#ffb347,#ff6b35)"):"#f5f5f5",
                        color:expGender===g?"white":"#aaa"}}>{g==="boy"?"👦 Ladka":"👧 Ladki"}</button>
                    ))}
                  </div>
                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:11,color:"#6a0572",fontWeight:700,marginBottom:6}}>🔤 Letter Filter</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                      {ALPHABET.map(l=>(
                        <button key={l} onClick={()=>setExpLetter(l)} style={{padding:"4px 8px",border:"none",borderRadius:8,cursor:"pointer",fontSize:11,fontWeight:700,minWidth:28,
                          background:expLetter===l?"linear-gradient(135deg,#ff6b35,#6a0572)":"#f5f5f5",color:expLetter===l?"white":"#888"}}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={fetchExploreNames} disabled={expLoading} style={{width:"100%",padding:13,border:"none",borderRadius:12,fontSize:14,fontWeight:800,cursor:expLoading?"not-allowed":"pointer",
                    background:expLoading?"#eee":"linear-gradient(135deg,#ff6b35,#6a0572)",color:expLoading?"#bbb":"white"}}>
                    {expLoading?"🔍 Dhundh raha hai...":"🔍 20 Names Dhundo"}
                  </button>
                </div>
                {expNames.length>0 && (
                  <div style={{background:"white",borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
                    <h3 style={{margin:"0 0 12px",fontSize:15,color:"#333"}}>✨ {expNames.length} Names Mile</h3>
                    {expNames.map((n,i)=><NameTile key={i} n={n}/>)}
                  </div>
                )}
              </div>
            )}

            {/* ── COUPLE TAB ── */}
            {namesTab==="couple" && (
              <div>
                <div style={{background:"white",borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 16px rgba(255,107,53,0.1)",border:"2px solid #fff3e0"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:22}}>💑</span><h3 style={{margin:0,fontSize:15,color:"#ff6b35",fontWeight:800}}>Couple ke Naam se Baby Name</h3></div>
                  <p style={{margin:"0 0 14px",fontSize:12,color:"#999"}}>Dono ke naam daalo — AI family se connected naam dega</p>
                  <div style={{display:"flex",gap:10,marginBottom:10}}>
                    <div style={{flex:1}}><div style={{fontSize:11,color:"#6a0572",fontWeight:700,marginBottom:5}}>👨 Husband</div><input placeholder="Jaise: Rahul" value={husband} onChange={e=>setHusband(e.target.value)} style={{width:"100%",padding:"10px 12px",border:"2px solid #ffe8d6",borderRadius:12,fontSize:14,boxSizing:"border-box",outline:"none"}}/></div>
                    <div style={{flex:1}}><div style={{fontSize:11,color:"#ff6b35",fontWeight:700,marginBottom:5}}>👩 Wife</div><input placeholder="Jaise: Priya" value={wife} onChange={e=>setWife(e.target.value)} style={{width:"100%",padding:"10px 12px",border:"2px solid #fff3e0",borderRadius:12,fontSize:14,boxSizing:"border-box",outline:"none"}}/></div>
                  </div>
                  <div style={{display:"flex",gap:8,marginBottom:12}}>
                    {["boy","girl"].map(g=>(
                      <button key={g} onClick={()=>setCoupleGender(g)} style={{flex:1,padding:9,border:"none",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:700,
                        background:coupleGender===g?(g==="boy"?"linear-gradient(135deg,#ffb347,#6a0572)":"linear-gradient(135deg,#ffb347,#ff6b35)"):"#f5f5f5",
                        color:coupleGender===g?"white":"#aaa"}}>{g==="boy"?"👦 Ladka":"👧 Ladki"}</button>
                    ))}
                  </div>
                  <button onClick={fetchCoupleNames} disabled={coupleLoading||!husband.trim()||!wife.trim()} style={{width:"100%",padding:13,border:"none",borderRadius:12,fontSize:14,fontWeight:800,
                    background:coupleLoading?"#eee":"linear-gradient(135deg,#ff6b35,#6a0572)",color:coupleLoading?"#bbb":"white",cursor:coupleLoading?"not-allowed":"pointer"}}>
                    {coupleLoading?"💫 Names bana raha hai...":"💫 Hamare Liye Names Dhundo"}
                  </button>
                  {coupleNames.length>0 && (
                    <div style={{marginTop:14}}>
                      <div style={{fontSize:12,color:"#6a0572",fontWeight:700,marginBottom:10}}>✨ {husband} & {wife} ke liye 20 names:</div>
                      {coupleNames.map((n,i)=><NameTile key={i} n={n}/>)}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── CUSTOM AI TAB ── */}
            {namesTab==="custom" && (
              <div>
                <div style={{background:"white",borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
                  <h3 style={{margin:"0 0 4px",fontSize:15,color:"#333"}}>🤖 AI se Custom Names</h3>
                  <p style={{margin:"0 0 12px",fontSize:12,color:"#999"}}>Apni preference batao — AI 20 unique names dega</p>
                  <div style={{display:"flex",gap:8,marginBottom:12}}>
                    {["boy","girl"].map(g=>(
                      <button key={g} onClick={()=>setAiGender(g)} style={{flex:1,padding:9,border:"none",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:700,
                        background:aiGender===g?(g==="boy"?"linear-gradient(135deg,#ffb347,#6a0572)":"linear-gradient(135deg,#ffb347,#ff6b35)"):"#f5f5f5",
                        color:aiGender===g?"white":"#aaa"}}>{g==="boy"?"👦 Ladka":"👧 Ladki"}</button>
                    ))}
                  </div>
                  <textarea placeholder="Jaise: S se shuru hone wale Tamil names... ya nature inspired Sanskrit names... ya short modern names..." value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)} rows={3}
                    style={{width:"100%",padding:"10px 14px",border:"2px solid #ffe8d6",borderRadius:12,fontSize:13,boxSizing:"border-box",outline:"none",marginBottom:10,resize:"none",fontFamily:"inherit"}}/>
                  <button onClick={fetchAINames} disabled={aiLoading||!aiPrompt.trim()} style={{width:"100%",padding:12,border:"none",borderRadius:12,fontSize:14,fontWeight:700,
                    background:aiLoading?"#eee":"linear-gradient(135deg,#6a0572,#ff6b35)",color:aiLoading?"#bbb":"white",cursor:aiLoading?"not-allowed":"pointer"}}>
                    {aiLoading?"✨ Generate ho raha hai...":"✨ Generate 20 Names"}
                  </button>
                  {aiNames.length>0 && <div style={{marginTop:14}}>{aiNames.map((n,i)=><NameTile key={i} n={n}/>)}</div>}
                </div>
              </div>
            )}

            {/* Saved Names */}
            {saved.length>0 && (
              <div style={{background:"linear-gradient(135deg,#fff3e0,#f3e0f7)",borderRadius:16,padding:16,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
                <h3 style={{margin:"0 0 12px",fontSize:15,color:"#ff6b35"}}>❤️ Saved Names ({saved.length})</h3>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {saved.map(name=>(
                    <span key={name} onClick={()=>toggleSave(name)} style={{background:"white",padding:"8px 14px",borderRadius:20,fontSize:14,fontWeight:700,color:"#ff6b35",boxShadow:"0 2px 8px rgba(255,107,53,0.15)",cursor:"pointer"}}>{name} ✕</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {detail && <DetailModal n={detail} onClose={()=>setDetail(null)}/>}
    </div>
  );
}
