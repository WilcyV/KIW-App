import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ThemeKey } from '../theme/colors';

const THEMES: { key: ThemeKey; name: string; color: string }[] = [
  { key:'sage',     name:'Verde salvia',  color:'#3D7A56' },
  { key:'blue',     name:'Azul grisáceo', color:'#4A7FA5' },
  { key:'lavender', name:'Lavanda',        color:'#7063A8' },
  { key:'warm',     name:'Terracota',      color:'#A0704A' },
  { key:'slate',    name:'Pizarra',        color:'#5A6480' },
  { key:'dark',     name:'Oscuro neon',    color:'#C8F060' },
];

const MODULES = [
  { icon:'💪', label:'Gym',    sub:'Piernas hoy'       },
  { icon:'📓', label:'Diario', sub:'12 días seguidos'  },
  { icon:'📋', label:'Listas', sub:'3 listas activas'  },
  { icon:'✈️', label:'Viajes', sub:'1 próximo'         },
  { icon:'🌙', label:'Sueño',  sub:'Prom. 7.2h'        },
  { icon:'🏆', label:'Logros', sub:'6/9 medallas'      },
];

export default function MoreScreen() {
  const { colors, themeKey, isDark, setThemeKey, toggleDark } = useTheme();

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: colors.header }}>
      <View style={[s.header, { backgroundColor: colors.header }]}>
        <Text style={{ fontSize:17, fontWeight:'700', color: colors.headerText }}>Explorar</Text>
        <Text style={{ fontSize:11, color: colors.headerText+'99', marginTop:2 }}>Todo KIW en un lugar</Text>
      </View>

      <ScrollView style={{ flex:1, backgroundColor: colors.bg }}
        contentContainerStyle={{ padding:12, paddingBottom:28, gap:10 }}
        showsVerticalScrollIndicator={false}>

        {/* Modules grid */}
        <View style={s.grid}>
          {MODULES.map(m => (
            <TouchableOpacity key={m.label}
              style={[s.gridItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={[s.gridIcon, { backgroundColor: colors.accentLight }]}>
                <Text style={{ fontSize:20 }}>{m.icon}</Text>
              </View>
              <Text style={{ fontSize:11, fontWeight:'700', color: colors.text }}>{m.label}</Text>
              <Text style={{ fontSize:10, color: colors.text3, textAlign:'center' }}>{m.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Temas */}
        <View style={[s.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[s.cardTitle, { color: colors.accent }]}>✦  Ambiente de color</Text>
          <View style={s.themeGrid}>
            {THEMES.map(t => (
              <TouchableOpacity key={t.key} onPress={() => setThemeKey(t.key)}
                style={[s.themeItem, {
                  borderColor:     themeKey===t.key ? colors.accent : colors.border,
                  backgroundColor: themeKey===t.key ? colors.accentLight : 'transparent',
                }]}>
                <View style={[s.themeDot, { backgroundColor: t.color, borderWidth: t.key==='dark' ? 0.5 : 0, borderColor:'#aaa' }]} />
                <Text style={{ fontSize:9, fontWeight:'500', color: colors.text2, textAlign:'center' }}>{t.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Ajustes */}
        <View style={[s.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[s.cardTitle, { color: colors.accent }]}>⚙  Ajustes</Text>

          <View style={[s.settingRow, { borderBottomColor: colors.border }]}>
            <View style={{ flex:1 }}>
              <Text style={{ fontSize:12, fontWeight:'600', color: colors.text }}>Modo oscuro</Text>
              <Text style={{ fontSize:10, color: colors.text3, marginTop:1 }}>Cambia la apariencia de KIW</Text>
            </View>
            <Switch value={isDark} onValueChange={toggleDark}
              trackColor={{ false: colors.surface2, true: colors.accentLight }}
              thumbColor={isDark ? colors.accent : colors.text3} />
          </View>

          {[
            { label:'Recordatorios inteligentes', sub:'KIW te avisa con prioridad', on:true  },
            { label:'Resumen del día',             sub:'Cada noche a las 21:00',    on:true  },
            { label:'Modo No Molestar',            sub:'Silenciar en horas de clase',on:false },
          ].map((st, i) => (
            <View key={st.label} style={[s.settingRow, { borderBottomColor: i<2 ? colors.border : 'transparent' }]}>
              <View style={{ flex:1 }}>
                <Text style={{ fontSize:12, fontWeight:'600', color: colors.text }}>{st.label}</Text>
                <Text style={{ fontSize:10, color: colors.text3, marginTop:1 }}>{st.sub}</Text>
              </View>
              <Switch value={st.on}
                trackColor={{ false: colors.surface2, true: colors.accentLight }}
                thumbColor={colors.accent} />
            </View>
          ))}
        </View>

        {/* Perfil */}
        <View style={[s.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[s.cardTitle, { color: colors.accent }]}>👤  Perfil</Text>
          <View style={{ flexDirection:'row', alignItems:'center', gap:10 }}>
            <View style={[s.avatar, { backgroundColor: colors.accentLight }]}>
              <Text style={{ fontSize:16, fontWeight:'700', color: colors.accent }}>S</Text>
            </View>
            <View style={{ flex:1 }}>
              <Text style={{ fontSize:13, fontWeight:'700', color: colors.text }}>Sofía García</Text>
              <Text style={{ fontSize:10, marginTop:2, color: colors.text3 }}>
                KIW te conoce hace 3 meses · racha: 12 días 🔥
              </Text>
            </View>
            <Text style={{ color: colors.text3, fontSize:18 }}>›</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header:     { paddingHorizontal:16, paddingTop:8, paddingBottom:12 },
  grid:       { flexDirection:'row', flexWrap:'wrap', gap:8 },
  gridItem:   { width:'30.5%', borderRadius:14, padding:12, alignItems:'center', gap:5, borderWidth:0.5 },
  gridIcon:   { width:38, height:38, borderRadius:10, alignItems:'center', justifyContent:'center' },
  card:       { borderRadius:14, padding:12, borderWidth:0.5 },
  cardTitle:  { fontSize:11, fontWeight:'700', marginBottom:12 },
  themeGrid:  { flexDirection:'row', flexWrap:'wrap', gap:7 },
  themeItem:  { width:'30.5%', borderRadius:10, padding:8, alignItems:'center', gap:5, borderWidth:1.5 },
  themeDot:   { width:20, height:20, borderRadius:10 },
  settingRow: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingVertical:9, borderBottomWidth:0.5 },
  avatar:     { width:40, height:40, borderRadius:20, alignItems:'center', justifyContent:'center' },
});
