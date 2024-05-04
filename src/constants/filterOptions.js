export const ROLES = [
    { title: "Backend" },
    { title: "Frontend" },
    { title: "FullStack" },
    { title: "IOS" },
    { title: "ReactNative" },
    { title: "Flutter" },
    { title: "Tech Lead" },
    { title: "Dev Ops" },
    { title: "HR" },
    { title: "Finance" },
    { title: "Product Manager" },
    { title: "Graphic Designer" },
];

export const EXPERIENCE_LEVELS = [
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
    { title: "7" },
    { title: "8" },
    { title: "9" },
    { title: "10" },
];

export const JOB_TYPES = [
    { title: "Remote" },
    { title: "Hybrid" },
    { title: "InOffice" },
];

export const SALARY_RANGES = [
    { title: "0L" },
    { title: "10L" },
    { title: "20L" },
    { title: "30L" },
    { title: "40L" },
    { title: "50L" },
    { title: "60L" },
    { title: "70L" },
];

export const filterJobsByLocation = (item, jobType) => {
    if (jobType?.length) {
        const result = jobType?.map((res) => {
            if (item?.location) {
                if (res?.title?.toLowerCase() === item?.location) return true;
                else if (res?.title === "InOffice" && item?.location !== "remote")
                    return true;
                else return false;
            } else return false;
        });
        return result?.find((res) => res === true);
    } else return true;
};

export const filterJobsByRole = (item, roles) => {
    if (roles?.length) {
        return roles?.find((res) =>
            res?.title?.toLowerCase()?.includes(item?.jobRole)
        );
    } else return true;
};
export const filterJobsByExperience = (item, experience) => {
    if (experience?.length) {
        return experience?.find((res) => res?.title >= item?.minExp);
    } else return true;
};

export const filterJobsBySalary = (item, salary) => {
    if (salary?.length) {
        return salary?.find(
            (res) => parseInt(res?.title) <= parseInt(item?.minJdSalary)
        );
    } else return true;
};
