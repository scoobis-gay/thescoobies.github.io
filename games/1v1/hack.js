const Log = function(msg) {
   console.log("1v1 hacks >:) : " + msg);
};

const wasm = WebAssembly;
const oldInstantiate = wasm.instantiate; //

wasm.instantiate = async function(bufferSource, importObject) {
   let out;
   
   if (new URLSearchParams(window.location.search).get("hacks") == "yes") {
      const patcher = new WasmPatcher(bufferSource);

      /*
         i32.load align=2 offset=100
         get_local 1
         i32.sub 
         i32.store align=2 offset=100

         28 2 64 20 1 [ 6B ] 36 2 64
      */

      patcher.aobPatchEntry({
         scan: '28 2 64 20 1 [ 6B ] 36 2 64',
         code: [
             OP.drop,
         ],
         onsuccess: () => console.log("enabled invincibility")
      });

      /*
         i32.load align=2 offset=104
         get_local 1
         i32.sub 
         i32.store align=2 offset=104

         28 2 68 20 1 [ 6B ] 36 2 68
      */

      patcher.aobPatchEntry({
         scan: '28 2 68 20 1 [ 6B ] 36 2 68',
         code: [
             OP.drop,
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
         ],
         onsuccess: () => console.log("enabled inf ammo")
      });

      patcher.aobPatchEntry({
         scan: '2A 2 1C | 38 2 10',
         code: [
             OP.drop,
             OP.f32.const, VAR.f32(0)
         ],
         onsuccess: () => console.log('disabled fire cooldown')
      });

      out = oldInstantiate(patcher.patch(), importObject)
   } else {
      out = oldInstantiate(bufferSource, importObject)
   }

   return out
};