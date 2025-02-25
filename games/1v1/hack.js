const Log = function(msg) {
   console.log("1v1 hacks >:) : " + msg);
};

const wasm = WebAssembly;
const oldInstantiate = wasm.instantiate;

wasm.instantiate = async function(bufferSource, importObject) {
   let out;
   
   if (new URLSearchParams(window.location.search).get("hacks") == "yes") {
      const patcher = new WasmPatcher(bufferSource);

      const backslashIndex = patcher.addGlobalVariableEntry({
         type: 'u32',
         value: 0,
         mutability: true,
         exportName: 'BACKSLASH'
      });

      const hackglobal = patcher.addGlobalVariableEntry({
         type: 'u32',
         value: 0,
         mutability: true
      });

      const hackglobal2 = patcher.addGlobalVariableEntry({
         type: 'u32',
         value: 0,
         mutability: true
      });

      const hackglobal3 = patcher.addGlobalVariableEntry({
         type: 'f32',
         value: 0,
         mutability: true
      });

      /*
         i32.load align=2 offset=100
         get_local 1
         i32.sub
         i32.store align=2 offset=100

         28 2 64 20 1 6B 36 2 64
      */

      patcher.aobPatchEntry({
         scan: '28 2 64 20 1 [ 6B ] 36 2 64',
         code: [
            OP.drop,
            OP.global.set, hackglobal,
            OP.global.get, backslashIndex,
            OP.i32.eqz,
            OP.if,
               OP.global.get, hackglobal,
               OP.local.get, VAR.u32(1),
               OP.i32.sub,
               OP.global.set, hackglobal,
            OP.end,
            OP.global.get, hackglobal,
         ],
         onsuccess: () => console.log("enabled invincibility")
      });

      /*
         i32.load align=2 offset=104
         get_local 1
         i32.sub //
         i32.store align=2 offset=104

         28 2 68 20 1 6B 36 2 68
      */

      patcher.aobPatchEntry({
         scan: '28 2 68 20 1 [ 6B ] 36 2 68',
         code: [
            OP.drop,
            OP.global.set, hackglobal,
            OP.global.get, backslashIndex,
            OP.i32.eqz,
            OP.if,
               OP.global.get, hackglobal,
               OP.local.get, VAR.u32(1),
               OP.i32.sub,
               OP.global.set, hackglobal,
            OP.end,
            OP.global.get, hackglobal,
         ],
         onsuccess: () => console.log("enabled invincibility 2")
      });

      /*
         i32.load align=2 offset=32
         i32.const 1
         i32.sub  //
         i32.store align=2 offset=32
         get_global 18
      */

      patcher.aobPatchEntry({
         scan: '28 2 20 41 1 [ 6B ] 36 2 20',
         code: [
            OP.drop,
            OP.global.set, hackglobal2,
            OP.global.get, backslashIndex,
            OP.i32.eqz,
            OP.if,
               OP.global.get, hackglobal2,
               OP.i32.const, VAR.u32(1),
               OP.i32.sub,
               OP.global.set, hackglobal2,
            OP.end,
            OP.global.get, hackglobal2,
         ],
         onsuccess: () => console.log("enabled inf ammo")
      });

      patcher.aobPatchEntry({
         scan: '2A 2 1C | 38 2 10',
         code: [
            OP.global.set, hackglobal3,
            OP.global.get, backslashIndex,
            OP.i32.eqz,
            OP.if,
            OP.else,
               OP.f32.const, VAR.f32(0),
               OP.global.set, hackglobal3,
            OP.end,
            OP.global.get, hackglobal3,
         ],
         onsuccess: () => console.log('disabled fire cooldown')
      });

      out = await oldInstantiate(patcher.patch(), importObject)

      out.instance.exports.BACKSLASH.value = 1;

      document.addEventListener('keyup', function(e) {
         if (e.code == "Backslash") {
            out.instance.exports.BACKSLASH.value = 1 - out.instance.exports.BACKSLASH.value;
            console.log(out.instance.exports.BACKSLASH.value);
         }
      });
   } else {
      out = await oldInstantiate(bufferSource, importObject)
   }

   return out
};