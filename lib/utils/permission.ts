import { Role } from "../types/user";
export function hasRequiredRole(
  roles?: Role[],
  requiredRoles?: Role[]
): boolean {
  if (!roles || !Array.isArray(roles) || !requiredRoles) return false;
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

// Helper สำหรับตรวจสอบสิทธิ์การจัดการผู้ใช้ (เตะ/ลบ/แบน)
export function canManageUser(myRoles?: Role[], targetRoles?: Role[]): boolean {
  if (!myRoles || !targetRoles) return false;

  const isSuperAdminMe = hasSuperAdminRole(myRoles);
  const isAdminMe = hasAdminRole(myRoles);
  const isAdminTarget = hasAdminRole(targetRoles);
  const isSuperAdminTarget = hasSuperAdminRole(targetRoles);

  // ห้าม super admin จัดการ super admin อื่น
  if (isSuperAdminTarget) return false;

  // ห้ามจัดการ admin ถ้าตัวเองไม่ใช่ super admin
  if (!isSuperAdminMe && isAdminTarget) return false;

  // ต้องมีสิทธิ์ admin ขึ้นไปถึงจะจัดการได้
  if (!isAdminMe && !isSuperAdminMe) return false;

  return true;
}
