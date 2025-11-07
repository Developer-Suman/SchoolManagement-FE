import {
  BriefcaseBusiness,
  ClipboardCheck,
  GraduationCap,
  ShieldHalfIcon,
} from "lucide-react";

export default function AttendancenLeave() {
  return (
    <div className="relative min-h-screen p-6">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            opacity: 0.1,
          }}
        ></div>
      </div>

      <div className="relative z-10 mt-10 space-y-12">
        {/* Leave Application Section */}
        <div className="relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent uppercase tracking-[0.2em] relative">
              Leave Applications
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse"></div>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Card */}
            <div className="relative">
              <div className="relative bg-gray-200  backdrop-blur-sm p-8 rounded-2xl border border-cyan-400/30">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="p-2 bg-cyan-400/20 rounded-full">
                    <GraduationCap className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-cyan-400 tracking-wider">
                    STUDENT UNIT
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/20">
                      <p className="text-xs  uppercase tracking-wide mb-1">
                        Requested
                      </p>
                      <p className="text-2xl font-mono font-bold text-cyan-400 animate-pulse">
                        0
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/20 mt-2">
                      <p className="text-xs  uppercase tracking-wide mb-1">
                        Approved
                      </p>
                      <p className="text-2xl font-mono font-bold text-emerald-400">
                        0
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/20">
                      <p className="text-xs  uppercase tracking-wide mb-1">
                        Pending
                      </p>
                      <p className="text-2xl font-mono font-bold text-yellow-400">
                        0
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/20 mt-2">
                      <p className="text-xs  uppercase tracking-wide mb-1">
                        Rejected
                      </p>
                      <p className="text-2xl font-mono font-bold text-red-400">
                        0
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Card */}
            <div className="relative">
              <div className="relative bg-gray-200 backdrop-blur-sm p-8 rounded-2xl border border-purple-400/30">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="p-2 bg-purple-400/20 rounded-full">
                    <BriefcaseBusiness />
                  </div>
                  <h3 className="text-lg font-bold text-purple-400 tracking-wider">
                    EMPLOYEE UNIT
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-white/10 rounded-xl p-4 border border-purple-400/20">
                      <p className="text-xs  uppercase tracking-wide mb-1">
                        Requested
                      </p>
                      <p className="text-2xl font-mono font-bold text-purple-400 animate-pulse">
                        0
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 border border-purple-400/20 mt-2">
                      <p className="text-xs  uppercase tracking-wide mb-1">
                        Approved
                      </p>
                      <p className="text-2xl font-mono font-bold text-emerald-400">
                        0
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/10 rounded-xl p-4 border border-purple-400/20">
                      <p className="text-xs  uppercase tracking-wide mb-1">
                        Pending
                      </p>
                      <p className="text-2xl font-mono font-bold text-yellow-400">
                        0
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 border border-purple-400/20 mt-2">
                      <p className="text-xs  uppercase tracking-wide mb-1">
                        Rejected
                      </p>
                      <p className="text-2xl font-mono font-bold text-red-400">
                        0
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Section */}
        <div className="relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-[0.2em] relative">
              Attendance
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse"></div>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Attendance */}
            <div className="relative">
              <div className="relative bg-gray-200 backdrop-blur-sm p-8 rounded-2xl border border-emerald-400/30">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="p-2 bg-emerald-400/20 rounded-full">
                    <ClipboardCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-400 tracking-wider">
                    STUDENT SCAN
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-700/50"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-pulse"></div>
                    <div className="absolute inset-2 rounded-full bg-emerald-400/10 flex items-center justify-center">
                      <span className="text-2xl font-mono font-bold text-emerald-400">
                        0%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
                      <span className="text-sm ">
                        Absent:{" "}
                        <span className="font-mono text-red-400">0</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="text-sm ">
                        Present:{" "}
                        <span className="font-mono text-emerald-400">0</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Attendance */}
            <div className="relative">
              <div className="relative bg-gray-200 backdrop-blur-sm p-8 rounded-2xl border border-cyan-400/30">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="p-2 bg-cyan-400/20 rounded-full">
                    <ShieldHalfIcon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-cyan-400 tracking-wider">
                    EMPLOYEE SCAN
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-700/50"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-pulse"></div>
                    <div className="absolute inset-2 rounded-full bg-cyan-400/10 flex items-center justify-center">
                      <span className="text-2xl font-mono font-bold text-cyan-400">
                        0%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
                      <span className="text-sm ">
                        Absent:{" "}
                        <span className="font-mono text-red-400">0</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                      <span className="text-sm ">
                        Present:{" "}
                        <span className="font-mono text-cyan-400">0</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
