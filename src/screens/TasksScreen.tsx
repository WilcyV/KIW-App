import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView,
  TextInput, Modal, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Task, Priority, PRIORITY_COLORS, PRIORITY_LABELS } from '../types';

const now = new Date().toISOString();
const INITIAL: Task[] = [
  { id:'1', user_id:'u1', title:'Entregar Lab de Física',    due_date:'Hoy 16:00',    priority:'urgente', done:false, created_at:now },
  { id:'2', user_id:'u1', title:'Estudiar para Química',     due_date:'Lunes 14:00',  priority:'urgente', done:false, created_at:now },
  { id:'3', user_id:'u1', title:'Comprar materiales',        due_date:'Esta semana',  priority:'media',   done:false, created_at:now },
  { id:'4', user_id:'u1', title:'Responder emails profesor', due_date:'Mañana',       priority:'media',   done:false, created_at:now },
  { id:'5', user_id:'u1', title:'Confirmar reunión',         due_date:'Hoy',          priority:'baja',    done:true,  created_at:now },
];

type Filter = 'todas' | 'pendientes' | 'hechas';
const ORDER: Record<Priority, number> = { urgente:0, media:1, baja:2 };

export default function TasksScreen() {
  const { colors } = useTheme();
  const [tasks, setTasks]     = useState<Task[]>(INITIAL);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter]   = useState<Filter>('todas');
  const [newTitle, setNewTitle]   = useState('');
  const [newDue, setNewDue]       = useState('');
  const [newPri, setNewPri]       = useState<Priority>('media');

  const pending   = tasks.filter(t => !t.done).length;
  const completed = tasks.filter(t =>  t.done).length;

  const visible = tasks
    .filter(t => filter === 'todas' ? true : filter === 'pendientes' ? !t.done : t.done)
    .sort((a,b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return ORDER[a.priority] - ORDER[b.priority];
    });

  const toggle = (id: string) => setTasks(ts => ts.map(t => t.id===id ? {...t, done:!t.done} : t));

  const addTask = () => {
    if (!newTitle.trim()) return;
    setTasks(ts => [{
      id: Date.now().toString(), user_id:'u1', title:newTitle.trim(),
      due_date: newDue || undefined, priority:newPri, done:false, created_at:new Date().toISOString(),
    }, ...ts]);
    setNewTitle(''); setNewDue(''); setNewPri('media');
    setShowAdd(false);
  };

  const urgentFirst = visible.find(t => !t.done && t.priority==='urgente');

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: colors.header }}>
      <View style={[s.header, { backgroundColor: colors.header }]}>
        <View>
          <Text style={[s.hTitle, { color: colors.headerText }]}>Tareas</Text>
          <Text style={{ fontSize:11, color: colors.headerText+'99', marginTop:2 }}>
            {pending} pendientes · {completed} hechas
          </Text>
        </View>
        <TouchableOpacity onPress={() => setShowAdd(true)}
          style={[s.addBtn, { backgroundColor:'rgba(255,255,255,0.2)' }]}>
          <Text style={{ color: colors.headerText, fontSize:20, lineHeight:24 }}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex:1, backgroundColor: colors.bg }}
        contentContainerStyle={{ padding:12, paddingBottom:24, gap:8 }}
        showsVerticalScrollIndicator={false}>

        {/* Filters */}
        <View style={{ flexDirection:'row', gap:7 }}>
          {(['todas','pendientes','hechas'] as Filter[]).map(f => (
            <TouchableOpacity key={f} onPress={() => setFilter(f)}
              style={[s.chip, {
                backgroundColor: filter===f ? colors.accentLight : colors.surface,
                borderColor:     filter===f ? colors.accent : colors.border,
              }]}>
              <Text style={{ fontSize:11, fontWeight:'500', color: filter===f ? colors.accent : colors.text2 }}>
                {f.charAt(0).toUpperCase()+f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* KIW tip */}
        {pending > 0 && urgentFirst && (
          <View style={[s.kiwTip, { backgroundColor: colors.accentLight, borderColor: colors.accent+'40' }]}>
            <Text style={{ fontSize:11, color: colors.accent }}>✦</Text>
            <View style={{ flex:1 }}>
              <Text style={{ fontSize:10, fontWeight:'700', color: colors.accent, marginBottom:2 }}>KIW recomienda</Text>
              <Text style={{ fontSize:11, color: colors.text, lineHeight:16 }}>
                Prioriza "{urgentFirst.title}" ahora. Tienes un bloque libre a las 14:00.
              </Text>
            </View>
          </View>
        )}

        {/* Task list */}
        {visible.map(task => {
          const { bg, text } = PRIORITY_COLORS[task.priority];
          return (
            <View key={task.id}
              style={[s.taskItem, { backgroundColor: colors.surface, borderColor: colors.border, opacity: task.done ? 0.5 : 1 }]}>
              <TouchableOpacity onPress={() => toggle(task.id)}
                style={[s.check, { borderColor: task.done ? colors.accent : colors.border, backgroundColor: task.done ? colors.accent : 'transparent' }]}>
                {task.done && <Text style={{ fontSize:10, color: colors.accentText }}>✓</Text>}
              </TouchableOpacity>
              <View style={{ flex:1 }}>
                <Text style={{ fontSize:12, fontWeight:'600', color: colors.text, textDecorationLine: task.done ? 'line-through' : 'none' }}>
                  {task.title}
                </Text>
                {task.due_date && (
                  <Text style={{ fontSize:10, color: colors.text3, marginTop:2 }}>🕐 {task.due_date}</Text>
                )}
              </View>
              <View style={[s.priBadge, { backgroundColor: bg }]}>
                <Text style={{ fontSize:9, fontWeight:'700', color: text }}>{PRIORITY_LABELS[task.priority]}</Text>
              </View>
            </View>
          );
        })}

        {visible.length === 0 && (
          <View style={[s.empty, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={{ fontSize:22, marginBottom:6 }}>✓</Text>
            <Text style={{ fontSize:13, fontWeight:'500', color: colors.text2 }}>
              {filter==='hechas' ? 'Aún no hay tareas completadas' : '¡Todo al día!'}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Add modal */}
      <Modal visible={showAdd} animationType="slide" transparent onRequestClose={() => setShowAdd(false)}>
        <KeyboardAvoidingView behavior={Platform.OS==='ios' ? 'padding' : 'height'} style={s.overlay}>
          <View style={[s.sheet, { backgroundColor: colors.surface }]}>
            <View style={[s.handle, { backgroundColor: colors.border }]} />
            <Text style={[s.sheetTitle, { color: colors.text }]}>Nueva tarea</Text>
            <TextInput
              style={[s.input, { backgroundColor: colors.surface2, color: colors.text, borderColor: colors.border }]}
              placeholder="¿Qué tienes que hacer?"
              placeholderTextColor={colors.text3}
              value={newTitle} onChangeText={setNewTitle} autoFocus
            />
            <TextInput
              style={[s.input, { backgroundColor: colors.surface2, color: colors.text, borderColor: colors.border }]}
              placeholder="Fecha límite (ej: Hoy 16:00)"
              placeholderTextColor={colors.text3}
              value={newDue} onChangeText={setNewDue}
            />
            <Text style={{ fontSize:11, fontWeight:'600', color: colors.text2, marginBottom:8 }}>Prioridad</Text>
            <View style={{ flexDirection:'row', gap:8, marginBottom:18 }}>
              {(['urgente','media','baja'] as Priority[]).map(p => (
                <TouchableOpacity key={p} onPress={() => setNewPri(p)}
                  style={[s.priChip, {
                    backgroundColor: newPri===p ? colors.accentLight : colors.surface2,
                    borderColor:     newPri===p ? colors.accent : colors.border,
                  }]}>
                  <Text style={{ fontSize:11, fontWeight:'600', color: newPri===p ? colors.accent : colors.text2 }}>
                    {PRIORITY_LABELS[p]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ flexDirection:'row', gap:10 }}>
              <TouchableOpacity onPress={() => setShowAdd(false)}
                style={[s.modalBtn, { backgroundColor: colors.surface2 }]}>
                <Text style={{ color: colors.text2, fontWeight:'500' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addTask}
                style={[s.modalBtn, { backgroundColor: colors.accent }]}>
                <Text style={{ color: colors.accentText, fontWeight:'700' }}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header:    { paddingHorizontal:16, paddingTop:8, paddingBottom:12, flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
  hTitle:    { fontSize:17, fontWeight:'700' },
  addBtn:    { width:30, height:30, borderRadius:9, alignItems:'center', justifyContent:'center' },
  chip:      { paddingHorizontal:12, paddingVertical:6, borderRadius:99, borderWidth:0.5 },
  kiwTip:    { borderRadius:12, padding:10, borderWidth:0.5, flexDirection:'row', gap:8, alignItems:'flex-start' },
  taskItem:  { flexDirection:'row', alignItems:'center', gap:10, padding:10, borderRadius:12, borderWidth:0.5 },
  check:     { width:20, height:20, borderRadius:6, borderWidth:1.5, alignItems:'center', justifyContent:'center', flexShrink:0 },
  priBadge:  { paddingHorizontal:7, paddingVertical:3, borderRadius:99 },
  empty:     { borderRadius:14, padding:28, alignItems:'center', borderWidth:0.5 },
  overlay:   { flex:1, justifyContent:'flex-end', backgroundColor:'rgba(0,0,0,0.4)' },
  sheet:     { borderTopLeftRadius:20, borderTopRightRadius:20, padding:20, paddingBottom:36 },
  handle:    { width:36, height:4, borderRadius:2, alignSelf:'center', marginBottom:16 },
  sheetTitle:{ fontSize:16, fontWeight:'700', marginBottom:14 },
  input:     { borderRadius:12, padding:11, fontSize:13, marginBottom:10, borderWidth:0.5 },
  priChip:   { flex:1, padding:8, borderRadius:10, borderWidth:0.5, alignItems:'center' },
  modalBtn:  { flex:1, padding:12, borderRadius:12, alignItems:'center' },
});
