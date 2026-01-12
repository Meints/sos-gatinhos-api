export class CheckIn {
  constructor(
    public readonly id: string,
    public readonly routeRunId: string,
    public readonly routePointId: string,
    public readonly checkedAt: Date,
    public readonly photoUrl: string | null,
    public readonly notes: string | null,
  ) {}
}
