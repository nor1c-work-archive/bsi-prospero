import { Entity } from "@app/common";
import { LevelUnitKerja, LproStatusEnum, QuarterQEnum } from "apps/api/src/common";

export class LproDomain extends Entity<number> {
    protected id: number;
    protected lpro: LevelUnitKerja;
    protected unitId: number;
    protected unitName: string;
    protected period: number;
    protected quarter: QuarterQEnum;
    protected status: LproStatusEnum;
    protected summary: string;
    protected rcsaId: number;
    protected kriId: number;
    protected ledId: number;
    protected iamId: number;

    protected createdAt: Date;
    protected createdBy: string;
    protected createdByName: string;
    protected updatedAt: Date;
    protected updatedBy: string;
    protected updatedByName: string;
    protected deletedAt: Date;
    protected deletedBy: string;
    protected deletedByName: string;
    protected isDeleted: number;

    /**
     * Getter $lpro
     * @return {string}
     */
	public getLpro(): LevelUnitKerja {
		return this.lpro;
	}

    /**
     * Getter $unitName
     * @return {string}
     */
	public getUnitName(): string {
		return this.unitName;
	}

    /**
     * Getter $quarter
     * @return {string}
     */
	public getQuarter(): QuarterQEnum {
		return this.quarter;
	}

    /**
     * Getter $period
     * @return {number}
     */
	public getPeriod(): number {
		return this.period;
	}

    /**
     * Getter $summary
     * @return {string}
     */
	public getSummary(): string {
		return this.summary;
	}

    public getStatus(): LproStatusEnum {
		return this.status;
	}

    public getUnitId(): number {
		return this.unitId;
	}

    public getRcsaId(): number {
		return this.rcsaId;
	}

    public getKriId(): number {
		return this.kriId;
	}

    public getLedId(): number {
		return this.ledId;
	}

    public getIamId(): number {
		return this.iamId;
	}
    
    public getCreatedAt() {
        return this.createdAt;
    }

    public getCreatedBy() {
        return this.createdBy;
    }

    public getCreatedByName() {
        return this.createdByName;
    }

    public getDeletedAt() {
        return this.deletedAt;
    }

    public getDeletedBy() {
        return this.deletedBy;
    }

    public getDeletedByName() {
        return this.deletedByName;
    }

    public getUpdatedAt() {
        return this.updatedAt;
    }

    public getUpdatedBy() {
        return this.updatedBy;
    }

    public getUpdatedByName() {
        return this.updatedByName;
    }

    public getIsDeleted() {
        return this.isDeleted
    }



    public setCreatedAt(value: any) {
        this.createdAt = value;
    }

    public setCreatedBy(value: any) {
        this.createdBy = value;
    }

    public setCreatedByName(value: any) {
        this.createdByName = value;
    }

    public setDeletedAt(value: any) {
        this.deletedAt = value;
    }

    public setDeletedBy(value: any) {
        this.deletedBy = value;
    }

    public setDeletedByName(value: any) {
        this.deletedByName = value;
    }

    public setUpdatedAt(value: any) {
        this.updatedAt = value;
    }

    public setUpdatedBy(value: any) {
        this.updatedBy = value;
    }

    public setUpdatedByName(value: any) {
        this.updatedByName = value;
    }

    public setIsDeleted(value: any) {
        this.isDeleted = value;
    }

    /**
     * Setter $lpro
     * @param {string} value
     */
	public setLpro(value: LevelUnitKerja) {
		this.lpro = value;
	}

    /**
     * Setter $unitName
     * @param {string} value
     */
	public setUnitName(value: string) {
		this.unitName = value;
	}

    /**
     * Setter $quarter
     * @param {string} value
     */
	public setQuarter(value: QuarterQEnum) {
		this.quarter = value;
	}

    /**
     * Setter $period
     * @param {number} value
     */
	public setPeriod(value: number) {
		this.period = value;
	}

    /**
     * Setter $summary
     * @param {string} value
     */
	public setSummary(value: string) {
		this.summary = value;
	}

    public setStatus(value: LproStatusEnum) {
        this.status = value
    }

	public setUnitId(value: number) {
		this.unitId = value;
	}

	public setRcsaId(value: number) {
		this.rcsaId = value;
	}
    
	public setKriId(value: number) {
		this.kriId = value;
	}
    
	public setLedId(value: number) {
		this.ledId = value;
	}
    
	public setIamId(value: number) {
		this.iamId = value;
	}

}
