import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { KiwEvent, CATEGORY_COLORS } from '../types';

const now = new Date();
const hm = (h: number, m = 0) =>
  new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m).toISOString();

const DEMO_EVENTS: KiwEvent[] = [
  { id:'1', user_id:'u1', title:'Cálculo III',        start_time:hm(8),  end_time:hm(10),    category:'clase',   color:CATEGORY_COLORS.clase,   location:'Aula 204', created_at:now.toISOString() },
  { id:'2', user_id:'u1', title:'Gym · Piernas',       start_time:hm(12), end_time:hm(13,30), category:'gym',     color:CATEGORY_COLORS.gym,     created_at:now.toISOString() },
  { id:'3', user_id:'u1', title:'Entrega Lab Física',  start_time:hm(16), end_time:hm(16,30), category:'examen',  color:CATEGORY_COLORS.examen,  created_at:now.toISOString() },
  { id:'4', user_id:'u1', title:'Reunión de estudio',  start_time:hm(18), end_time:hm(20),    category:'reunión', color:CATEGORY_COLORS.reunión, location:'Casa Ana', created_at:now.toISOString() },
];

const DAY_NAMES  = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const MONTH_NAMES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

function addDays(base: Date, n: number) {
  const d = new Date(base); d.setDate(d.getDate() + n); return d;
}
function sameDay(a: Date, b: Date) {
  return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
}
function fmt(iso: string) {
  const d = new Date(iso);
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`;
}

export default function CalendarScreen() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState(now);

  const days = [-1,0,1,2,3,4,5].map(n => addDays(now, n));
  const todayEvents = DEMO_EVENTS.filter(ev => sameDay(new Date(ev.start_time), selected));
  const label = `${DAY_NAMES[selected.getDay()]} ${selected.getDate()} de ${MONTH_NAMES[selected.getMonth()]}`;

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: colors.header }}>
      <View style={[s.header, { backgroundColor: colors.header }]}>
        <View style={{ flex:1 }}>
          <Text style={[s.hTitle, { color: colors.headerText }]}>Agenda</Text>
          <Text style={{ fontSize:11, color: colors.headerText+'99', marginTop:2 }}>
            {MONTH_NAMES[now.getMonth()]} {now.getFullYear()}
          </Text>
        </View>
        <TouchableOpacity style={[s.addBtn, { backgroundColor:'rgba(255,255,255,0.2)' }]}>
          <Text style={{ color: colors.headerText, fontSize:20, lineHeight:24 }}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex:1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingBottom:24 }} showsVerticalScrollIndicator={false}>
        {/* Day strip */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:12, paddingVertical:10, gap:7 }}>
          {days.map(d => {
            const isSel = sameDay(d, selected);
            const hasEv = DEMO_EVENTS.some(ev => sameDay(new Date(ev.start_time), d));
            return (
              <TouchableOpacity key={d.toISOString()} onPress={() => setSelected(d)}
                style={[s.pill, { borderColor: colors.border, backgroundColor: isSel ? colors.accent : colors.surface }]}>
                <Text style={{ fontSize:9, fontWeight:'600', color: isSel ? colors.accentText : colors.text3 }}>
                  {DAY_NAMES[d.getDay()].toUpperCase()[0]}
                </Text>
                <Text style={{ fontSize:14, fontWeight:'700', color: isSel ? colors.accentText : colors.text2 }}>
                  {d.getDate()}
                </Text>
                {hasEv && <View style={[s.evDot, { backgroundColor: isSel ? colors.accentText : colors.accent }]} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={{ fontSize:13, fontWeight:'600', color: colors.text, paddingHorizontal:14, marginBottom:10 }}>
          {sameDay(selected, now) ? 'Hoy — ' : ''}{label}
        </Text>

        {todayEvents.length > 0 ? (
          <View style={{ paddingHorizontal:12, gap:0 }}>
            {todayEvents.map(ev => {
              const urgent = ev.category === 'examen';
              return (
                <View key={ev.id} style={s.tlItem}>
                  <Text style={{ width:38, fontSize:10, textAlign:'right', paddingTop:10, color: urgent ? '#C0392B' : colors.text3 }}>
                    {fmt(ev.start_time)}
                  </Text>
                  <View style={{ alignItems:'center' }}>
                    <View style={[s.tlDot, { backgroundColor: ev.color }]} />
                    <View style={[s.tlLine, { backgroundColor: colors.border }]} />
                  </View>
                  <View style={[s.tlCard, { backgroundColor: colors.surface, borderColor: urgent ? '#C0392B' : colors.border, borderWidth: urgent ? 1 : 0.5, marginBottom:6 }]}>
                    <Text style={{ fontSize:12, fontWeight:'600', color: colors.text }}>{ev.title}</Text>
                    <View style={{ flexDirection:'row', alignItems:'center', gap:6, marginTop:2 }}>
                      <Text style={{ fontSize:10, color: urgent ? '#C0392B' : colors.text3 }}>
                        {fmt(ev.start_time)} – {fmt(ev.end_time)}{ev.location ? ` · ${ev.location}` : ''}
                      </Text>
                      {ev.id === '2' && (
                        <View style={[s.badge, { backgroundColor: colors.accentLight }]}>
                          <Text style={{ fontSize:8, color: colors.accent, fontWeight:'700' }}>✦ KIW</Text>
                        </View>
                      )}
                      {urgent && (
                        <View style={[s.badge, { backgroundColor:'rgba(192,57,43,0.12)' }]}>
                          <Text style={{ fontSize:8, color:'#C0392B', fontWeight:'700' }}>Urgente</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={[s.empty, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={{ fontSize:22, marginBottom:6 }}>📅</Text>
            <Text style={{ fontSize:13, fontWeight:'600', color: colors.text2 }}>Sin eventos este día</Text>
            <Text style={{ fontSize:11, marginTop:4, textAlign:'center', color: colors.text3 }}>
              Toca + para agregar o dile a KIW que lo cree
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: { paddingHorizontal:16, paddingTop:8, paddingBottom:12, flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
  hTitle: { fontSize:17, fontWeight:'700' },
  addBtn: { width:30, height:30, borderRadius:9, alignItems:'center', justifyContent:'center' },
  pill:   { alignItems:'center', paddingVertical:6, paddingHorizontal:10, borderRadius:10, borderWidth:0.5, minWidth:44 },
  evDot:  { width:4, height:4, borderRadius:2, marginTop:3 },
  tlItem: { flexDirection:'row', gap:8 },
  tlDot:  { width:8, height:8, borderRadius:4, marginTop:11, flexShrink:0 },
  tlLine: { width:1, flex:1, marginTop:2 },
  tlCard: { flex:1, borderRadius:10, padding:8 },
  badge:  { paddingHorizontal:6, paddingVertical:2, borderRadius:99 },
  empty:  { margin:12, borderRadius:14, padding:24, alignItems:'center', borderWidth:0.5 },
});
