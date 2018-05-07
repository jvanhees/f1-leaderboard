export interface Telemetry {
  car: string;
  classic: boolean;
  time: Date;
  m_time: number; //F
  m_lapTime: number; //F
  m_lapDistance: number; //F
  m_totalDistance: number; //F
  m_x: number;  // World space position F
  m_y: number; // World space position F
  m_z: number;  // World space position F
  m_speed: number;  // Speed of car in MPH F
  m_xv: number;  // Velocity in world space F
  m_yv: number;  // Velocity in world space F
  m_zv: number;  // Velocity in world space F
  m_xr: number;  // World space right direction F
  m_yr: number;  // World space right direction F
  m_zr: number;  // World space right direction F
  m_xd: number;  // World space forward direction F
  m_yd: number;  // World space forward direction F
  m_zd: number;  // World space forward direction F
  m_susp_pos: number[]; // F array
  m_susp_vel: number[];  // RL; RR; FL; FR  F array
  m_wheel_speed: number[]; // F array
  m_throttle: number; // F
  m_steer: number; // F
  m_brake: number; // F
  m_clutch: number; // F
  m_gear: number; // F
  m_gforce_lat: number; // F
  m_gforce_lon: number; // F
  m_lap: number; // F
  m_engineRate: number; // F
  m_sli_pro_native_support: number; // F  // SLI Pro support
  m_car_position: number; // F  // car race position
  m_kers_level: number; // F  // kers energy left
  m_kers_max_level: number; // F  // kers maximum energy
  m_drs: number; // F  // 0 = off; 1 = on
  m_traction_control: number; // F  // 0 (off) - 2 (high)
  m_anti_lock_brakes: number; // F  // 0 (off) - 1 (on)
  m_fuel_in_tank: number; // F  // current fuel mass
  m_fuel_capacity: number; // F  // fuel capacity
  m_in_pits: number; // F  // 0 = none; 1 = pitting; 2 = in pit area
  m_sector: number; // F  // 0 = sector1; 1 = sector2; 2 = sector3
  m_sector1_time: number; // F  // time of sector1 (or 0)
  m_sector2_time: number; // F  // time of sector2 (or 0)
  m_brakes_temp: number[];  // brakes temperature (centigrade)
  m_tyres_pressure: number[];  // tyres pressure PSI
  m_team_info: number; // F  // team ID
  m_total_laps: number; // F  // total number of laps in this race
  m_track_size: number; // F  // track size meters
  m_last_lap_time: number; // F  // last lap time
  m_max_rpm: number;  // cars max RPM; at which point the rev limiter will kick in
  m_idle_rpm: number;  // cars idle RPM
  m_max_gears: number;  // maximum number of gears
  m_sessionType: number;  // 0 = unknown; 1 = practice; 2 = qualifying; 3 = race
  m_drsAllowed: number;  // 0 = not allowed; 1 = allowed; -1 = invalid / unknown
  m_track_number: number;  // -1 for unknown; 0-21 for tracks
  m_vehicleFIAFlags: number;  // -1 = invalid/unknown; 0 = none; 1 = green; 2 = blue; 3 = yellow; 4 = red
  m_era: number; // era; 2017 (modern) or 1980 (classic)
  m_engine_temperature: number;    // engine temperature (centigrade)
  m_gforce_vert: number;  // vertical g-force component
  m_ang_vel_x: number;  // angular velocity x-component
  m_ang_vel_y: number;  // angular velocity y-component
  m_ang_vel_z: number;  // angular velocity z-component

  m_tyres_temperature: number[];  // tyres temperature (centigrade)
  m_tyres_wear: number[];  // tyre wear percentage
  m_tyre_compound: number;  // compound of tyre – 0 = ultra soft; 1 = super soft; 2 = soft; 3 = medium; 4 = hard; 5 = inter; 6 = wet
  m_front_brake_bias: number;         // front brake bias (percentage)
  m_fuel_mix: number;                 // fuel mix - 0 = lean; 1 = standard; 2 = rich; 3 = max
  m_currentLapInvalid: number;     // current lap invalid - 0 = valid; 1 = invalid
  m_tyres_damage: number[];  // tyre damage (percentage)
  m_front_left_wing_damage: number;  // front left wing damage (percentage)
  m_front_right_wing_damage: number;  // front right wing damage (percentage)
  m_rear_wing_damage: number;  // rear wing damage (percentage)
  m_engine_damage: number;  // engine damage (percentage)
  m_gear_box_damage: number;  // gear box damage (percentage)
  m_exhaust_damage: number;  // exhaust damage (percentage)
  m_pit_limiter_status: number;  // pit limiter status – 0 = off; 1 = on
  m_pit_speed_limit: number;  // pit speed limit in mph
  m_session_time_left: number;  // NEW: time left in session in seconds
  m_rev_lights_percent: number;  // NEW: rev lights indicator (percentage)
  m_is_spectating: number;  // NEW: whether the player is spectating
  m_spectator_car_index: number; // NEW: index of the car being spectated
}
