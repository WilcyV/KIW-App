import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  SafeAreaView, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ChatMessage } from '../types';

// Respuestas demo — en Fase 5 se reemplazan con Claude API real
const REPLIES = [
  'Listo ✦ Agregué el evento. También veo un bloque libre el lunes 14:00–16:00, ideal para estudiar. ¿Lo agendo?',
  'Esta semana tienes: Lab Física hoy 16:00 (urgente), Parcial Química martes 10:00. Recomiendo estudiar el lunes 14–16h.',
  'El domingo tienes libre 10:00–12:00. Puedo mover el gym ahí y mantener tu meta de 4 sesiones. ¿Confirmo?',
  'Lista creada. Dime qué agregar o yo sugiero ítems según tu rutina.',
  'Reorganizando tu tarde: Estudio 14:00–15:30, entrega 16:00, reunión movida al sábado. ¿Aplico los cambios?',
];

const CHIPS = [
  '¿Qué tengo esta semana?',
  'Reorganiza mi tarde',
  '¿Puedo mover el gym?',
  'Crear lista de viaje',
  '¿A qué hora debo salir?',
];

export default function ChatScreen() {
  const { colors } = useTheme();
  const [msgs, setMsgs]       = useState<ChatMessage[]>([{
    id:'0', role:'assistant', content:'¡Hola! Soy KIW ✦ Tu asistente personal. Puedo organizar tu agenda, crear recordatorios, calcular cuándo salir y mucho más. ¿En qué te ayudo hoy?', timestamp:new Date(),
  }]);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const ri = useRef(0);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setInput('');
    const userMsg: ChatMessage = { id: Date.now().toString(), role:'user', content, timestamp:new Date() };
    setMsgs(prev => [...prev, userMsg]);
    setTyping(true);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated:true }), 80);
    setTimeout(() => {
      setTyping(false);
      const reply: ChatMessage = { id:(Date.now()+1).toString(), role:'assistant', content: REPLIES[ri.current % REPLIES.length], timestamp:new Date() };
      ri.current++;
      setMsgs(prev => [...prev, reply]);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated:true }), 80);
    }, 1100);
  };

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: colors.header }}>
      {/* Header */}
      <View style={[s.header, { backgroundColor: colors.header }]}>
        <View style={[s.kiwAv, { backgroundColor:'rgba(0,0,0,0.18)' }]}>
          <Text style={{ color:'#E8C49A', fontSize:16 }}>✦</Text>
        </View>
        <View>
          <Text style={{ fontSize:15, fontWeight:'700', color: colors.headerText }}>KIW Chat</Text>
          <Text style={{ fontSize:10, marginTop:1, color: colors.headerText+'99' }}>
            {typing ? 'escribiendo...' : 'Tu asistente personal con IA'}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS==='ios' ? 'padding':'height'} style={{ flex:1, backgroundColor: colors.bg }}>
        {/* Messages */}
        <ScrollView ref={scrollRef} style={{ flex:1 }} contentContainerStyle={{ padding:12, gap:10, paddingBottom:8 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated:false })}>
          {msgs.map(m => (
            <View key={m.id} style={[s.msgWrap, m.role==='user' ? s.right : s.left]}>
              {m.role==='assistant' && <Text style={{ fontSize:10, color: colors.text3, marginBottom:2, paddingLeft:2 }}>KIW</Text>}
              <View style={[s.bubble,
                m.role==='user'
                  ? { backgroundColor: colors.accent, borderRadius:14, borderTopRightRadius:4 }
                  : { backgroundColor: colors.surface, borderColor: colors.border, borderWidth:0.5, borderRadius:4, borderTopLeftRadius:14, borderBottomLeftRadius:14, borderBottomRightRadius:14 }
              ]}>
                <Text style={{ fontSize:13, lineHeight:19, color: m.role==='user' ? colors.accentText : colors.text }}>
                  {m.content}
                </Text>
              </View>
            </View>
          ))}
          {typing && (
            <View style={[s.msgWrap, s.left]}>
              <Text style={{ fontSize:10, color: colors.text3, marginBottom:2, paddingLeft:2 }}>KIW</Text>
              <View style={[s.bubble, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth:0.5, borderRadius:4, borderTopLeftRadius:14, borderBottomLeftRadius:14, borderBottomRightRadius:14 }]}>
                <Text style={{ color: colors.text3, fontSize:18, letterSpacing:3 }}>●●●</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          style={[s.chipsBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}
          contentContainerStyle={{ paddingHorizontal:12, paddingVertical:7, gap:6, alignItems:'center' }}>
          {CHIPS.map(c => (
            <TouchableOpacity key={c} onPress={() => send(c)}
              style={[s.chip, { borderColor: colors.border, backgroundColor: colors.surface }]}>
              <Text style={{ fontSize:11, color: colors.text2 }}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={[s.inputRow, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <TextInput
            style={[s.input, { backgroundColor: colors.surface2, color: colors.text, borderColor: colors.border }]}
            placeholder="Escríbele a KIW..."
            placeholderTextColor={colors.text3}
            value={input} onChangeText={setInput}
            onSubmitEditing={() => send()} returnKeyType="send" multiline
          />
          <TouchableOpacity onPress={() => send()} style={[s.sendBtn, { backgroundColor: colors.accent }]}>
            <Text style={{ color: colors.accentText, fontSize:16 }}>→</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header:   { paddingHorizontal:16, paddingTop:8, paddingBottom:12, flexDirection:'row', alignItems:'center', gap:10 },
  kiwAv:    { width:32, height:32, borderRadius:16, alignItems:'center', justifyContent:'center' },
  msgWrap:  { maxWidth:'85%', gap:3 },
  left:     { alignSelf:'flex-start' },
  right:    { alignSelf:'flex-end' },
  bubble:   { padding:10 },
  chipsBar: { borderTopWidth:0.5, maxHeight:44 },
  chip:     { paddingHorizontal:10, paddingVertical:5, borderRadius:99, borderWidth:0.5 },
  inputRow: { flexDirection:'row', gap:8, padding:10, borderTopWidth:0.5, alignItems:'center' },
  input:    { flex:1, borderRadius:20, paddingHorizontal:13, paddingVertical:8, fontSize:13, borderWidth:0.5, maxHeight:80 },
  sendBtn:  { width:34, height:34, borderRadius:17, alignItems:'center', justifyContent:'center', flexShrink:0 },
});
