import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { KiwEvent, Task, CATEGORY_COLORS } from '../types';

const now = new Date();
const hm = (h: number, m = 0) =>
  new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m).toISOString();

const DEMO_EVENTS: KiwEvent[] = [
  { id:'1', user_id:'u1', title:'Cálculo III',        start_time:hm(8),  end_time:hm(10), category:'clase',   color:CATEGORY_COLORS.clase,   location:'Aula 204', created_at:now.toISOString() },
  { id:'2', user_id:'u1', title:'Gym · Piernas',       start_time:hm(12), end_time:hm(13,30), category:'gym', color:CATEGORY_COLORS.gym,     created_at:now.toISOString() },
  { id:'3', user_id:'u1', title:'Entrega Lab Física',  start_time:hm(16), end_time:hm(16,30), category:'examen', color:CATEGORY_COLORS.examen, created_at:now.toISOString() },
  { id:'4', user_id:'u1', title:'Reunión de estudio',  start_time:hm(18), end_time:hm(20), category:'reunión', color:CATEGORY_COLORS.reunión, location:'Casa Ana', created_at:now.toISOString() },
];

const DEMO_TASKS: Task[] = [
  { id:'t1', user_id:'u1', title:'Entregar Lab de Física', due_date:'Hoy 16:00', priority:'urgente', done:false, created_at:now.toISOString() },
  { id:'t2', user_id:'u1', title:'Estudiar para Química',  due_date:'Lunes 14:00', priority:'urgente', done:false, created_at:now.toISOString() },
  { id:'t3', user_id:'u1', title:'Comprar materiales',     due_date:'Esta semana', priority:'media',   done:false, created_at:now.toISOString() },
];

function fmt(iso: string) {
  const d = new Date(iso);
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`;
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const pending = DEMO_TASKS.filter(t => !t.done).length;

  const days = ['dom','lun','mar','mié','jue','vie','sáb'];
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const dateLabel = `${days[now.getDay()]} ${now.getDate()} de ${months[now.getMonth()]}`;

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: colors.header }}>
      {/* ── Header ── */}
      <View style={[s.header, { backgroundColor: colors.header }]}>
        <View style={{ flex:1 }}>
          <Text style={[s.greeting, { color: colors.headerText }]}>Buenos días, Sofía</Text>
          <Text style={{ fontSize:11, color: colors.headerText+'99', marginTop:2 }}>
            {dateLabel} · {DEMO_EVENTS.length} eventos hoy
          </Text>
        </View>
        <View style={[s.avatar, { backgroundColor: colors.accentLight }]}>
          <Text style={{ fontSize:15, fontWeight:'700', color: colors.accent }}>S</Text>
        </View>
      </View>

      {/* ── KIW banner ── */}
      <View style={[s.kiwBanner, { backgroundColor: colors.header+'BB' }]}>
        <View style={[s.bannerIcon, { backgroundColor:'rgba(255,255,255,0.18)' }]}>
          <Text style={{ color:'#E8C49A', fontSize:13 }}>✦</Text>
        </View>
        <View style={{ flex:1 }}>
          <Text style={{ fontSize:11, fontWeight:'600', color: colors.headerText }}>KIW sugiere</Text>
          <Text style={{ fontSize:10, color: colors.headerText+'AA' }}>Sal a las 7:40 · tráfico +12 min detectado</Text>
        </View>
      </View>

      <ScrollView style={{ flex:1, backgroundColor: colors.bg }} contentContainerStyle={{ padding:12, gap:10, paddingBottom:24 }} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={{ flexDirection:'row', gap:7 }}>
          {[
            { label:'Hoy',      val: DEMO_EVENTS.length, sub:'eventos' },
            { label:'Tareas',   val: pending,            sub:'pendientes' },
            { label:'Metas',    val: 3,                  sub:'activas' },
            { label:'Sueño',    val:'7h',                sub:'anoche' },
          ].map(st => (
            <View key={st.label} style={[s.statCard, { backgroundColor: colors.surface2 }]}>
              <Text style={{ fontSize:10, color: colors.text3, marginBottom:3 }}>{st.label}</Text>
              <Text style={{ fontSize:22, fontWeight:'700', color: colors.accent }}>{st.val}</Text>
              <Text style={{ fontSize:10, color: colors.text3, marginTop:1 }}>{st.sub}</Text>
            </View>
          ))}
        </View>

        {/* Agenda */}
        <View style={[s.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[s.cardTitle, { color: colors.accent }]}>◈  Agenda de hoy</Text>
          {DEMO_EVENTS.map((ev, i) => (
            <View key={ev.id} style={[s.evRow, { borderBottomColor: colors.border, borderBottomWidth: i < DEMO_EVENTS.length-1 ? 0.5 : 0 }]}>
              <View style={[s.evDot, { backgroundColor: ev.color }]} />
              <View style={{ flex:1 }}>
                <Text style={{ fontSize:12, fontWeight:'600', color: colors.text }}>{ev.title}</Text>
                <Text style={{ fontSize:10, color: ev.category==='examen' ? '#C0392B' : colors.text3, marginTop:1 }}>
                  {fmt(ev.start_time)} – {fmt(ev.end_time)}{ev.location ? ` · ${ev.location}` : ''}
                  {ev.category==='examen' ? ' · Urgente' : ''}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* KIW recomienda */}
        <View style={[s.card, { backgroundColor: colors.accentLight, borderColor: colors.accent+'40' }]}>
          <Text style={[s.cardTitle, { color: colors.accent }]}>✦  KIW recomienda</Text>
          {[
            { icon:'🧠', title:'Estudia Física 14–16h', sub:'Bloque libre en tu agenda' },
            { icon:'🌙', title:'Duerme antes de las 23:00', sub:'Objetivo 8h/noche activo' },
            { icon:'🚗', title:'Sal a las 7:40 mañana', sub:'Clase a las 8:00 · 20 min de viaje' },
          ].map(a => (
            <View key={a.title} style={s.alertRow}>
              <View style={[s.alertIcon, { backgroundColor: colors.surface }]}>
                <Text style={{ fontSize:12 }}>{a.icon}</Text>
              </View>
              <View style={{ flex:1 }}>
                <Text style={{ fontSize:12, fontWeight:'600', color: colors.text }}>{a.title}</Text>
                <Text style={{ fontSize:10, color: colors.text3, marginTop:1 }}>{a.sub}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Calendarios */}
        <View style={[s.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[s.cardTitle, { color: colors.accent }]}>⊞  Calendarios conectados</Text>
          <View style={{ flexDirection:'row', gap:7, flexWrap:'wrap' }}>
            {[
              { icon:'G', label:'Google',    iconColor:'#EA4335', bg:'#fff' },
              { icon:'🍎', label:'Apple',    iconColor:'#333',    bg:'#000' },
            ].map(c => (
              <View key={c.label} style={[s.calBadge, { borderColor: colors.border }]}>
                <Text style={{ fontSize:11, color: c.iconColor }}>{c.icon}</Text>
                <Text style={{ fontSize:10, color: colors.text2 }}>{c.label}</Text>
              </View>
            ))}
            <TouchableOpacity style={[s.calBadge, { borderStyle:'dashed', borderColor: colors.border }]}>
              <Text style={{ fontSize:13, color: colors.text3 }}>+</Text>
              <Text style={{ fontSize:10, color: colors.text3 }}>Más</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header:    { paddingHorizontal:16, paddingTop:8, paddingBottom:10, flexDirection:'row', alignItems:'center' },
  greeting:  { fontSize:17, fontWeight:'700' },
  avatar:    { width:34, height:34, borderRadius:17, alignItems:'center', justifyContent:'center' },
  kiwBanner: { marginHorizontal:14, marginBottom:2, borderRadius:12, padding:10, flexDirection:'row', alignItems:'center', gap:8 },
  bannerIcon:{ width:28, height:28, borderRadius:8, alignItems:'center', justifyContent:'center' },
  statCard:  { flex:1, borderRadius:12, padding:10 },
  card:      { borderRadius:14, padding:12, borderWidth:0.5 },
  cardTitle: { fontSize:11, fontWeight:'700', marginBottom:10 },
  evRow:     { flexDirection:'row', alignItems:'flex-start', gap:8, paddingVertical:6 },
  evDot:     { width:7, height:7, borderRadius:4, marginTop:4, flexShrink:0 },
  alertRow:  { flexDirection:'row', alignItems:'center', gap:8, paddingVertical:5 },
  alertIcon: { width:26, height:26, borderRadius:8, alignItems:'center', justifyContent:'center' },
  calBadge:  { flexDirection:'row', alignItems:'center', gap:5, paddingHorizontal:10, paddingVertical:5, borderRadius:8, borderWidth:0.5 },
});
