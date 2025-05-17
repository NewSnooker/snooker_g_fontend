import { Role } from "../types/user";
export function hasRequiredRole(
  roles?: Role[],
  requiredRoles?: Role[]
): boolean {
  if (!roles || !requiredRoles) return false;
  return roles.some((role) => requiredRoles.includes(role));
}

export function hasUserRole(roles: Role[]): boolean {
  return hasRequiredRole(roles, [Role.USER]);
}

export function hasAdminRole(roles: Role[]): boolean {
  return hasRequiredRole(roles, [Role.ADMIN]);
}

export function hasSuperAdminRole(roles: Role[]): boolean {
  return hasRequiredRole(roles, [Role.SUPER_ADMIN]);
}

export function hasAdminOrSuperAdminRole(roles: Role[]): boolean {
  return hasRequiredRole(roles, [Role.ADMIN, Role.SUPER_ADMIN]);
}

export function denyIfAdminOrSuperAdmin(roles: Role[]): string | undefined {
  if (hasAdminOrSuperAdminRole(roles)) {
    console.warn(
      "[denyIfAdminOrSuperAdmin] ไม่อนุญาตให้ ADMIN/SUPER_ADMIN ใช้งานฟังก์ชันนี้"
    );
    return "คุณไม่มีสิทธิ์เข้าถึงฟังก์ชันนี้";
  }
}
