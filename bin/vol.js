const _ = require('../include/dry.baseline.node.include.js');

/*
Volume of a cylinder = pi x radius squared x height
Cylinder Volume = π r2 h
Cylinder Volume = 3.14159265 x radius 2 x height
1 US gallon = 231 cubic inches
1 Imperial gallon = 1 UK gallon = 277.419 cubic inches
*/

const cin_in_liter = 61.0237;

function cylinder_vol(r, h){
   return(Math.pow(r, 2) * Math.PI * h);
}

function l_water_to_lbs(l){ return(l*2.20462); }

function vols_for_id(id){
   var vols = [];

   for(var h = 1; h <= 36; h++){
      var vol_in_l = (cylinder_vol(id/2, h) / cin_in_liter);
      vols.push({
         id,
         height: h,
         vol_in_l,
         water_weight: l_water_to_lbs(vol_in_l)
      });
   }

   return(vols);
}

function print_pipes(rec, is_inner){
   _.p(`height: ${rec.height} in vol: ${_.format.fixed(rec.vol_in_l, 3)} L water weight: ${_.format.fixed(rec.water_weight, 2)} lbs`);
}

function print_pressures(rec){
   _.p(`cmh2o: ${rec.cmh2o} lbs: ${_.format.fixed(rec.lbs, 2)}`);
}


function cmh2o_to_lbs(cmh2o, id){
   var circle_area = Math.pow(id/2, 2) * Math.PI;
   var psi = cmh2o / 70.307;
   return(circle_area * psi);
}

function pressure_table(id){
   return _.map(_.range(1, 35), function(i){ 
      return {
         id,
         cmh2o: i,
         lbs: cmh2o_to_lbs(i, id)
      } 
   });

}

var inner_id = 3;

let inner_vols = _.filter(vols_for_id(inner_id), function(v){ return(v.vol_in_l > .6 && v.vol_in_l < 2); })
_.p(`ID: ${inner_id} in`)
_.each(inner_vols,  print_pipes);

_.each(pressure_table(inner_id), print_pressures);


var outer_id = 5.9;
let outer_vols = _.filter(vols_for_id(outer_id), function(v){ return(v.height == 1 || (v.water_weight > 14 && v.height <= 24)); })

_.p(`ID: ${outer_id} in`)
_.each(outer_vols, print_pipes);



