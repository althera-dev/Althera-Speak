import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Rocket,
  Check,
  X,
} from "lucide-react";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
];

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const passwordStrength = PASSWORD_RULES.filter((rule) =>
    rule.test(password)
  ).length;
  const strengthPercent = (passwordStrength / PASSWORD_RULES.length) * 100;
  const strengthColor =
    strengthPercent <= 25
      ? "bg-destructive"
      : strengthPercent <= 50
        ? "bg-orange-500"
        : strengthPercent <= 75
          ? "bg-yellow-500"
          : "bg-emerald-500";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signUp.email({
        name,
        email,
        password,
        username,
      });

      if (result.error) {
        setError(
          result.error.message || "Registration failed. Please try again."
        );
      } else {
        navigate({ to: "/" });
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background">
      {/* Left Panel - Branding */}
      <div className="relative hidden w-1/2 lg:flex lg:flex-col lg:items-center lg:justify-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-linear-to-br from-emerald-600/30 to-cyan-600/30 blur-3xl"
            animate={{
              x: [0, 80, -40, 0],
              y: [0, -60, 40, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-linear-to-br from-violet-600/20 to-indigo-600/20 blur-3xl"
            animate={{
              x: [0, -60, 80, 0],
              y: [0, 80, -40, 0],
              scale: [1, 0.9, 1.15, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-1/3 top-1/3 h-[350px] w-[350px] rounded-full bg-linear-to-br from-fuchsia-500/15 to-pink-500/15 blur-3xl"
            animate={{
              x: [0, 40, -60, 0],
              y: [0, -80, 20, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white/20"
            style={{
              left: `${20 + i * 12}%`,
              top: `${15 + i * 13}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Branding content */}
        <motion.div
          className="relative z-10 max-w-md px-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Rocket className="size-4" />
            Start your journey
          </motion.div>

          <motion.h1
            className="mb-4 text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Join{" "}
            <span className="bg-linear-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Althera
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Create your account and unlock the power of intelligent
            communication.
          </motion.p>

          {/* Feature list */}
          <motion.div
            className="mt-10 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {[
              "AI-powered voice enhancement",
              "Real-time transcription",
              "Multi-language support",
            ].map((feature, i) => (
              <motion.div
                key={feature}
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
              >
                <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/20">
                  <Check className="size-3 text-emerald-500" />
                </div>
                {feature}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex w-full items-center justify-center px-4 py-8 lg:w-1/2">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Mobile branding */}
          <motion.div
            className="mb-8 text-center lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold tracking-tight">
              Join{" "}
              <span className="bg-linear-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Althera
              </span>
            </h1>
          </motion.div>

          <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
            <CardHeader className="space-y-1 pb-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <CardTitle className="text-2xl font-bold">
                  Create Account
                </CardTitle>
                <CardDescription className="pt-1">
                  Fill in the details below to get started
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        {error}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Name field */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    autoComplete="name"
                    className="h-11 transition-all duration-200 focus:scale-[1.01]"
                  />
                </motion.div>

                {/* Username field */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      @
                    </span>
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))
                      }
                      onFocus={() => setFocusedField("username")}
                      onBlur={() => setFocusedField(null)}
                      required
                      minLength={3}
                      maxLength={30}
                      autoComplete="username"
                      className="h-11 pl-7 transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>
                  <AnimatePresence>
                    {focusedField === "username" && username.length > 0 && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-muted-foreground"
                      >
                        {username.length < 3
                          ? `${3 - username.length} more character${3 - username.length > 1 ? "s" : ""} needed`
                          : `${30 - username.length} characters remaining`}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email field */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                >
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    autoComplete="email"
                    className="h-11 transition-all duration-200 focus:scale-[1.01]"
                  />
                </motion.div>

                {/* Password field */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="h-11 pr-10 transition-all duration-200 focus:scale-[1.01]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      tabIndex={-1}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={showPassword ? "visible" : "hidden"}
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 90 }}
                          transition={{ duration: 0.15 }}
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </button>
                  </div>

                  {/* Password strength indicator */}
                  <AnimatePresence>
                    {password.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 overflow-hidden"
                      >
                        {/* Strength bar */}
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <motion.div
                            className={`h-full rounded-full ${strengthColor}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${strengthPercent}%` }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          />
                        </div>

                        {/* Rules */}
                        <div className="grid grid-cols-2 gap-1">
                          {PASSWORD_RULES.map((rule, i) => {
                            const passed = rule.test(password);
                            return (
                              <motion.div
                                key={rule.label}
                                className="flex items-center gap-1.5"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: i * 0.05,
                                  duration: 0.2,
                                }}
                              >
                                <motion.div
                                  initial={false}
                                  animate={{
                                    scale: passed ? [1, 1.3, 1] : 1,
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {passed ? (
                                    <Check className="size-3 text-emerald-500" />
                                  ) : (
                                    <X className="size-3 text-muted-foreground/50" />
                                  )}
                                </motion.div>
                                <span
                                  className={`text-xs transition-colors ${
                                    passed
                                      ? "text-emerald-500"
                                      : "text-muted-foreground/50"
                                  }`}
                                >
                                  {rule.label}
                                </span>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    className="group relative h-11 w-full overflow-hidden bg-linear-to-r from-emerald-600 to-cyan-600 text-white transition-all duration-300 hover:from-emerald-700 hover:to-cyan-700 hover:shadow-lg hover:shadow-emerald-500/25"
                    disabled={isLoading || passwordStrength < PASSWORD_RULES.length}
                  >
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <Loader2 className="size-4 animate-spin" />
                          <span>Creating account...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <span>Create Account</span>
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </motion.div>

                {/* Link to login */}
                <motion.div
                  className="pt-2 text-center text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-emerald-500 underline-offset-4 transition-colors hover:text-emerald-400 hover:underline"
                  >
                    Sign in
                  </Link>
                </motion.div>
              </form>
            </CardContent>
          </Card>

          {/* Bottom decoration */}
          <motion.div
            className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="h-px w-12 bg-linear-to-r from-transparent to-border" />
            <span>Secure authentication</span>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-border" />
          </motion.div>
        </motion.div>
      </div>

      {/* Background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}
